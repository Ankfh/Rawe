import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import BookModel from '../model/bookModel.js';
import { uploadsDir } from '../../../shared/uploadMidleware/services/uploadMulterService.js';

export const deleteBookById = async bookId => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    const error = new Error('Invalid book id');
    error.statusCode = 400;
    throw error;
  }

  const deletedBook = await BookModel.findByIdAndDelete(bookId).lean();

  if (!deletedBook) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  const filePath = path.join(uploadsDir, deletedBook.storedName);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  return deletedBook;
};
