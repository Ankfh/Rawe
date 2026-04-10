import BookModel from '../model/bookModel.js';

export const saveBookMetadata = async metadata => {
  const bookDocument = await BookModel.create({
    originalName: metadata.originalName,
    storedName: metadata.storedName,
    size: metadata.size,
    mimeType: metadata.mimeType,
    uploadedAt: new Date(metadata.uploadedAt),
  });

  return bookDocument;
};
