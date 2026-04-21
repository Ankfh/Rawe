export const buildUploadMetadata = file => {
  return {
    originalName: file.originalname,
    storedName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    destination: file.destination,
    path: file.path,
    uploadedAt: new Date().toISOString(),
  };
};
