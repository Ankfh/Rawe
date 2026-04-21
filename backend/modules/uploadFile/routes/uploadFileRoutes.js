import express from 'express';
import { requireAuth } from '../../auth/middleware/authMiddleware.js';
import { uploadPdfMiddleware } from '../../../shared/uploadMidleware/services/uploadMulterService.js';
import { uploadFileController } from '../controller/uploadFileController.js';
import { getBooksListController } from '../controller/bookListController.js';
import { deleteBookController } from '../controller/deleteBookController.js';

const uploadFileRoutes = express.Router();

uploadFileRoutes.post('/', requireAuth, uploadPdfMiddleware, uploadFileController);
uploadFileRoutes.get('/books', requireAuth, getBooksListController);
uploadFileRoutes.delete('/books/:bookId', requireAuth, deleteBookController);

export default uploadFileRoutes;
