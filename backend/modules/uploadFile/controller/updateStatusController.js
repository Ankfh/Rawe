import { updateBookProcessingStatus } from '../services/bookMetadataService.js';

export const updateStatusController = async (req, res) => {
  const { bookId, status, processingError } = req.body;

  if (!bookId || !status) {
    return res.status(400).json({
      success: false,
      message: 'bookId and status are required.',
    });
  }

  try {
    const updatedBook = await updateBookProcessingStatus({
      bookId,
      status,
      processingError,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    console.log(`[AI][STATUS] Book ${bookId} updated to ${status}`);

    return res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
    });
  } catch (error) {
    console.error('[AI][STATUS] Error updating status:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};
