import express from 'express';
import fetchuser from './fetchuser.js';
import Chat from '../models/Chat.js';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';

const chatRouter = express.Router();

// GET /api/chat/messages/:recipientId - Get messages between user and recipient
chatRouter.get('/messages/:recipientId', fetchuser, async (req, res) => {
  try {
    const { recipientId } = req.params;
    const userId = req.user.id;

    const messages = await Chat.find({
      $or: [
        { senderId: userId, recipientId },
        { senderId: recipientId, recipientId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// POST /api/chat/send - Send a message
chatRouter.post('/send', fetchuser, [
  body('recipientId', 'Recipient ID is required').isMongoId(),
  body('message', 'Message is required').trim().notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { recipientId, message } = req.body;
    const senderId = req.user.id;

    const newMessage = new Chat({
      senderId,
      recipientId,
      message,
    });

    const savedMessage = await newMessage.save();
    res.json({ success: true, message: savedMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// GET /api/chat/conversations - Get all users who have chatted with the current user
chatRouter.get('/conversations', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all messages where user is recipient, get unique senders
    const messages = await Chat.find({ recipientId: userId }).select('senderId').distinct('senderId');

    // Get user details for each sender
    const conversations = await Promise.all(
      messages.map(async (senderId) => {
        const user = await User.findById(senderId).select('fullname email');
        return { userId: senderId, ...user.toObject() };
      })
    );

    res.json({ success: true, conversations });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default chatRouter