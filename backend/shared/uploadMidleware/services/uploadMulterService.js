import fs from 'fs';
import path from 'path';
import multer from 'multer';

const uploadsDir = process.env.UPLOADS_PATH
  ? path.resolve(process.env.UPLOADS_PATH)
  : path.resolve(process.cwd(), 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '.pdf') || '.pdf';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `upload-${uniqueSuffix}${ext.toLowerCase()}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const mimetype = file.mimetype === 'application/pdf';
  const extension = (file.originalname || '').toLowerCase().endsWith('.pdf');

  if (mimetype || extension) {
    cb(null, true);
    return;
  }

  cb(new Error('Only PDF files are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    // Set to absolute system max (500MB). 
    // Specific dynamic enforcement is handled in uploadFileController.js
    fileSize: 500 * 1024 * 1024,
  },
});

export const uploadPdfMiddleware = (req, res, next) => {
  upload.single('file')(req, res, error => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({
        success: false,
        message: 'File too large. Max allowed size is 10MB.',
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: error.message || 'File upload failed',
    });
  });
};

export { uploadsDir };
