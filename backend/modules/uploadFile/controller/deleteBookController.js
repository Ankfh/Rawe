import { deleteBookById } from '../services/bookDeleteService.js';

export const deleteBookController = async (req, res) => {
  try {
    const { bookId } = req.params;
    const deletedBook = await deleteBookById(bookId);

    return res.status(200).json({
      success: true,
      message: 'Book deleted successfully.',
      data: {
        id: deletedBook._id,
        originalName: deletedBook.originalName,
        storedName: deletedBook.storedName,
      },
    });
  } catch (error) {
    if (error.statusCode === 400 || error.statusCode === 404) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to delete book.',
    });
  }
};
