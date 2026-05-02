const DEFAULT_PYTHON_BACKEND_URL = 'http://localhost:8000';

const getPythonBackendUrl = () => {
  return process.env.PYTHON_BACKEND_URL || DEFAULT_PYTHON_BACKEND_URL;
};

/**
 * Notifies the Python backend to delete the vectors for a specific book.
 * This is called in the background (fire and forget) to ensure responsiveness.
 */
export const notifyPythonDeleteService = (bookId) => {
  const pythonServiceUrl = `${getPythonBackendUrl()}/api/vectorization/${bookId}`;

  // Fire and forget - we don't await this in the main flow
  fetch(pythonServiceUrl, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(async (response) => {
      if (response.ok) {
        console.log(`[DELETE][AI] Vectors for book ${bookId} deleted successfully from Python backend.`);
      } else {
        const errorText = await response.text();
        console.error(`[DELETE][AI] Python backend failed to delete vectors for book ${bookId}:`, errorText);
      }
    })
    .catch((error) => {
      console.error(`[DELETE][AI] Error notifying Python backend for book deletion:`, error.message);
    });
};
