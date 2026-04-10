import { saveBookMetadata } from '../services/bookMetadataService.js';

export const uploadFileController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file provided. Please attach a PDF file.',
    });
  }

  const metadata = {
    originalName: req.file.originalname,
    storedName: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    destination: req.file.destination,
    path: req.file.path,
    uploadedAt: new Date().toISOString(),
  };

  try {
    const savedBook = await saveBookMetadata(metadata);

    console.log('[UPLOAD] File uploaded and metadata saved:', {
      id: savedBook._id,
      originalName: savedBook.originalName,
      storedName: savedBook.storedName,
      size: savedBook.size,
      mimeType: savedBook.mimeType,
      uploadedAt: savedBook.uploadedAt,
    });

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully.',
      data: {
        id: savedBook._id,
        originalName: savedBook.originalName,
        storedName: savedBook.storedName,
        size: savedBook.size,
        mimeType: savedBook.mimeType,
        uploadedAt: savedBook.uploadedAt,
      },
    });
  } catch (error) {
    console.error('[UPLOAD] Failed to save metadata:', error.message);

    return res.status(500).json({
      success: false,
      message: 'File uploaded but metadata could not be saved.',
    });
  }
};
