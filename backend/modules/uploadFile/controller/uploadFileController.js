import {
  getBookById,
  saveBookMetadata,
  updateBookProcessingStatus,
} from '../services/bookMetadataService.js';
import { buildUploadMetadata } from '../services/uploadMetadataBuilderService.js';
import { notifyPythonUploadService } from '../services/pythonUploadNotificationService.js';
import { getSettingsService } from '../../admin/services/getSettingsService.js';
import { countBooksByUserId } from '../services/bookListService.js';

const buildUploadSuccessResponse = savedBook => ({
  id: savedBook._id,
  originalName: savedBook.originalName,
  storedName: savedBook.storedName,
  size: savedBook.size,
  mimeType: savedBook.mimeType,
  uploadedAt: savedBook.uploadedAt,
  processingStatus: savedBook.processingStatus,
  processingError: savedBook.processingError,
});

export const uploadFileController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file provided. Please attach a PDF file.',
    });
  }

  try {
    // 1. Fetch current admin settings for limits
    const settings = await getSettingsService();
    const { maxUploadFileCount, maxUploadFileSizeMB } = settings;

    // 2. Validate file size (bytes to MB)
    const fileSizeMB = req.file.size / (1024 * 1024);
    if (fileSizeMB > maxUploadFileSizeMB) {
      return res.status(403).json({
        success: false,
        message: `File size too large. Max limit is ${maxUploadFileSizeMB}MB.`,
      });
    }

    // 3. Validate user's total file count
    const userBookCount = await countBooksByUserId(req.user.id);
    if (userBookCount >= maxUploadFileCount) {
      return res.status(403).json({
        success: false,
        message: `You have reached your limit of ${maxUploadFileCount} books. Please delete some before uploading more.`,
      });
    }
  } catch (error) {
    console.error('[UPLOAD][LIMIT_CHECK] Error:', error.message);
    // Continue if settings fetch fails? Or fail safe? Let's fail safe.
    return res.status(500).json({
      success: false,
      message: 'Failed to verify upload limits.',
    });
  }

  const metadata = buildUploadMetadata(req.file);

  try {
    const savedBook = await saveBookMetadata({
      ...metadata,
      userId: req.user.id,
    });
    const persistedBook = await getBookById(savedBook._id);

    if (!persistedBook) {
      throw new Error('Book metadata could not be read after insertion.');
    }

    await notifyPythonUploadService({
      id: String(persistedBook._id),
      originalName: persistedBook.originalName,
      storedName: persistedBook.storedName,
      size: persistedBook.size,
      mimeType: persistedBook.mimeType,
      uploadedAt: persistedBook.uploadedAt,
      filePath: metadata.path,
      destination: metadata.destination,
    });

    const updatedBook = await updateBookProcessingStatus({
      bookId: persistedBook._id,
      status: 'processing',
      processingError: null,
    });

    console.log('[UPLOAD] File uploaded, saved, and Python notified:', {
      id: updatedBook?._id || persistedBook._id,
      originalName: persistedBook.originalName,
      storedName: persistedBook.storedName,
      size: persistedBook.size,
      mimeType: persistedBook.mimeType,
      uploadedAt: persistedBook.uploadedAt,
    });

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully.',
      data: buildUploadSuccessResponse(updatedBook || persistedBook),
    });
  } catch (error) {
    if (error?.bookId) {
      await updateBookProcessingStatus({
        bookId: error.bookId,
        status: 'failed',
        processingError: error.message,
      }).catch(() => null);
    }

    console.error('[UPLOAD] Failed to save metadata:', error.message);

    const isPythonNotificationError = error?.stage === 'python-notify';

    return res.status(isPythonNotificationError ? 502 : 500).json({
      success: false,
      message: isPythonNotificationError
        ? 'File uploaded but Python service notification failed.'
        : 'File uploaded but metadata could not be saved.',
    });
  }
};
