const DEFAULT_PYTHON_BACKEND_URL = 'http://localhost:8000';

const getPythonBackendUrl = () => {
  return process.env.PYTHON_BACKEND_URL || DEFAULT_PYTHON_BACKEND_URL;
};

const buildPythonPayload = payload => {
  return {
    bookId: payload.id,
    originalName: payload.originalName,
    storedName: payload.storedName,
    size: payload.size,
    mimeType: payload.mimeType,
    uploadedAt: payload.uploadedAt,
    filePath: payload.filePath,
    destination: payload.destination,
  };
};

export const notifyPythonUploadService = async payload => {
  const pythonServiceUrl = `${getPythonBackendUrl()}/api/vectorization/upload-notification`;
  const requestBody = buildPythonPayload(payload);

  const response = await fetch(pythonServiceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const error = new Error(errorBody?.message || 'Python service rejected upload notification.');
    error.stage = 'python-notify';
    error.bookId = payload.id;
    throw error;
  }

  return response.json().catch(() => ({ success: true }));
};
