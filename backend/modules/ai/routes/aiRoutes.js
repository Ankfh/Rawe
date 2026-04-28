import express from 'express';
import { requireAuth } from '../../auth/middleware/authMiddleware.js';
import { aiChatController } from '../controller/aiChatController.js';

const aiRoutes = express.Router();

// Ask a question about a specific book
aiRoutes.post('/ask/:bookId', requireAuth, aiChatController);

export default aiRoutes;
