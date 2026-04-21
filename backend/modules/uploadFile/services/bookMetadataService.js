import BookModel from '../model/bookModel.js';

export const saveBookMetadata = async metadata => {
  return BookModel.create({
    userId: metadata.userId,
    originalName: metadata.originalName,
    storedName: metadata.storedName,
    size: metadata.size,
    mimeType: metadata.mimeType,
    uploadedAt: new Date(metadata.uploadedAt),
  });
};

export const getBookById = async bookId => {
  return BookModel.findById(bookId).lean();
};

export const updateBookProcessingStatus = async ({ bookId, status, processingError = null }) => {
  return BookModel.findByIdAndUpdate(
    bookId,
    {
      processingStatus: status,
      processingError,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};
