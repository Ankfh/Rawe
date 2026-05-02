import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import BookModel from '../model/bookModel.js';
import { uploadsDir } from '../../../shared/uploadMidleware/services/uploadMulterService.js';
import { notifyPythonDeleteService } from './pythonDeleteNotificationService.js';

export const deleteBookById = async ({ bookId, userId }) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    const error = new Error('Invalid book id');
    error.statusCode = 400;
    throw error;
  }

  const book = await BookModel.findById(bookId).lean();

  if (!book) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  if (String(book.userId) !== String(userId)) {
    const error = new Error('You do not have permission to delete this book');
    error.statusCode = 403;
    throw error;
  }

  await BookModel.findByIdAndDelete(bookId);

  const filePath = path.join(uploadsDir, book.storedName);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  // 4. Notify Python backend to delete vectors (Background/Non-blocking)
  notifyPythonDeleteService(bookId);

  console.log(`[DELETE] Book ${bookId} removed from database and filesystem.`);

  return book;
};
