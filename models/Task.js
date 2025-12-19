const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  }
}, {
  timestamps: false,
  versionKey: false
});

module.exports = mongoose.model('Task', taskSchema);