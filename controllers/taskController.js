const Task = require('../models/Task');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const verifyToken = (req) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return null;
  try {
    return jwt.verify(token, 'secret-key');
  } catch {
    return null;
  }
};

const getAllTasks = async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }
  
  let tasks;
  try {
    tasks = await Task.find();
    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getTaskById = async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }
  
  const { id } = req.params;
  let task;
  try {
    task = await Task.findOne({ id: parseInt(id) });
    if (task) {
      res.status(200).json({
        success: true,
        data: task
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createTask = async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }
  
  const { title, description, priority, dueDate } = req.body;
  const taskData = {
    id: Date.now(),
    title,
    description,
    status: 'Pending',
    priority,
    createdAt: new Date().toISOString().split('T')[0],
    dueDate
  };
  let task;
  try {
    task = new Task(taskData);
    await task.save();
    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const updateTask = async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }
  
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;
  let task;
  try {
    task = await Task.findOneAndUpdate(
      { id: parseInt(id) },
      { title, description, status, priority, dueDate },
      { new: true }
    );
    if (task) {
      res.status(200).json({
        success: true,
        data: task,
        message: 'Task updated successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteTask = async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }
  
  const { id } = req.params;
  let task;
  try {
    task = await Task.findOneAndDelete({ id: parseInt(id) });
    if (task) {
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };