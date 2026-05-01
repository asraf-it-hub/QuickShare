const ShareData = require("../models/ShareData");
const fs = require("fs");
const path = require("path");

// Generate a random 6-digit PIN
const generatePin = async () => {
  let pin;
  let isUnique = false;
  while (!isUnique) {
    pin = Math.floor(100000 + Math.random() * 900000).toString();
    const existing = await ShareData.findOne({ pin });
    if (!existing) {
      isUnique = true;
    }
  }
  return pin;
};

exports.shareData = async (req, res) => {
  try {
    const { text } = req.body;
    let fileUrl = "";
    let fileName = "";

    if (req.file) {
      // In production, configure Cloudinary. For now, we use local uploads.
      fileUrl = `/uploads/${req.file.filename}`;
      fileName = req.file.originalname;
    }

    if (!text && !req.file) {
      return res.status(400).json({ error: "Please provide text or a file." });
    }

    const pin = await generatePin();
    
    // Auto expires after 10 minutes logic handled by mongoose model
    const newShare = new ShareData({
      pin,
      text: text || "",
      fileUrl,
      fileName,
    });

    await newShare.save();

    res.status(201).json({
      pin: newShare.pin,
      expiresAt: newShare.expiresAt,
      message: "Data shared successfully.",
    });
  } catch (error) {
    console.error("Error sharing data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.receiveData = async (req, res) => {
  try {
    const { pin } = req.params;

    if (!pin || pin.length !== 6) {
      return res.status(400).json({ error: "Invalid PIN format." });
    }

    // Find the record
    const shareData = await ShareData.findOne({ pin });

    if (!shareData) {
      return res.status(404).json({ error: "Invalid or expired PIN." });
    }

    // Increment downloads count
    shareData.downloads += 1;
    await shareData.save();

    const responseTemplate = {
      text: shareData.text,
      fileUrl: shareData.fileUrl,
      fileName: shareData.fileName,
      expiresAt: shareData.expiresAt,
    };

    // Auto delete after first download (as requested by User requirement)
    // Send response and then remove the document so it is pseudo-expiring
    // The delay prevents race conditions if the user instantly hits refresh
    res.status(200).json(responseTemplate);

    setTimeout(async () => {
      try {
        if (shareData.fileUrl) {
          const filePath = path.join(__dirname, "..", shareData.fileUrl);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
        await ShareData.deleteOne({ _id: shareData._id });
        console.log(`Auto-deleted PIN ${pin} after download.`);
      } catch (err) {
        console.error("Error deleting file/record post-download:", err);
      }
    }, 5000); // Remove after 5 seconds
    
  } catch (error) {
    console.error("Error receiving data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
