import express from 'express';
import { uploadPdfMiddleware } from '../../../shared/uploadMidleware/services/uploadMulterService.js';
import { uploadFileController } from '../controller/uploadFileController.js';
import { getBooksListController } from '../controller/bookListController.js';
import { deleteBookController } from '../controller/deleteBookController.js';

const uploadFileRoutes = express.Router();

uploadFileRoutes.post('/', uploadPdfMiddleware, uploadFileController);
uploadFileRoutes.get('/books', getBooksListController);
uploadFileRoutes.delete('/books/:bookId', deleteBookController);

export default uploadFileRoutes;
