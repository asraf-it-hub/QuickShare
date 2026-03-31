require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Share = require('./models/Share');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Static serve for uploads
app.use('/api/downloads', express.static(uploadsDir));

// Multer configured for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pinshare';
mongoose.connect(MONGODB_URI)
  .then(() => console.log(`MongoDB connected to ${MONGODB_URI}`))
  .catch(err => console.error('MongoDB connection error. Please ensure MongoDB is running or provide a valid MONGODB_URI in backend/.env.', err.message));

// Route: POST /api/share
app.post('/api/share', upload.single('file'), async (req, res) => {
  try {
    const { text } = req.body;
    const file = req.file;

    if (!text && !file) {
      return res.status(400).json({ error: 'Please provide text or a file.' });
    }

    // Generate 6-digit PIN
    let pin;
    let exists = true;
    while (exists) {
      pin = Math.floor(100000 + Math.random() * 900000).toString();
      const existingShare = await Share.findOne({ pin });
      if (!existingShare) {
        exists = false;
      }
    }

    const shareData = {
      pin,
      text: text || '',
    };

    if (file) {
      shareData.file = {
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      };
    }

    const newShare = new Share(shareData);
    await newShare.save();

    res.status(201).json({ pin, message: 'Shared successfully!' });
  } catch (error) {
    console.error('Share error:', error);
    res.status(500).json({ error: 'Server error while sharing data.' });
  }
});

// Route: GET /api/receive/:pin
app.get('/api/receive/:pin', async (req, res) => {
  try {
    const { pin } = req.params;
    const share = await Share.findOne({ pin });

    if (!share) {
      return res.status(404).json({ error: 'PIN not found or has expired.' });
    }

    res.status(200).json({
      text: share.text,
      file: share.file && share.file.filename ? {
        originalname: share.file.originalname,
        downloadUrl: `/api/downloads/${share.file.filename}`,
        size: share.file.size
      } : null,
      createdAt: share.createdAt
    });
  } catch (error) {
    console.error('Receive error:', error);
    res.status(500).json({ error: 'Server error while retrieving data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
