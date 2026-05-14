const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { validateMessage } = require('../utils/validators');
const { successResponse } = require('../utils/errorHandler');

// Get all messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(successResponse(messages, 'Messages retrieved successfully'));
  } catch (error) {
    next(error);
  }
});

// Get single message
router.get('/:id', async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    res.json(successResponse(message, 'Message retrieved successfully'));
  } catch (error) {
    next(error);
  }
});

// Create message
router.post('/', async (req, res, next) => {
  try {
    // Validate input
    const errors = validateMessage(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    const message = new Message(req.body);
    const newMessage = await message.save();
    res.status(201).json(successResponse(newMessage, 'Message sent successfully', 201));
  } catch (error) {
    next(error);
  }
});

// Delete message
router.delete('/:id', async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    res.json(successResponse(null, 'Message deleted successfully'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
