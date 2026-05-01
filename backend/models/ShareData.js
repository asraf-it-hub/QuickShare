const mongoose = require("mongoose");

const ShareDataSchema = new mongoose.Schema({
  pin: {
    type: String,
    required: true,
    unique: true,
    length: 6,
  },
  text: {
    type: String,
    default: "",
  },
  fileUrl: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
  },
  downloads: {
    type: Number,
    default: 0,
  },
});

// TTL index to automatically delete documents when expiresAt is reached
ShareDataSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("ShareData", ShareDataSchema);
