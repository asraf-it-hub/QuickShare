const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
  pin: { 
    type: String, 
    required: true, 
    unique: true 
  },
  text: { 
    type: String, 
    default: '' 
  },
  file: {
    filename: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    size: { type: Number },
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 600 // Automatically deletes the document after 10 minutes (600 seconds)
  }
});

module.exports = mongoose.model('Share', shareSchema);
