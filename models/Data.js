// models/Data.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  source: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Data', dataSchema);
