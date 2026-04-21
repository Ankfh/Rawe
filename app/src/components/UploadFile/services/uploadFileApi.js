import { BASE_URL } from '../../../baseUrl/data/baseUrls';
import { store } from '../../../store/store';

const parseErrorMessage = async response => {
  try {
    const errorJson = await response.json();
    return errorJson.message || 'Upload failed';
  } catch (_error) {
    return `Upload failed with status ${response.status}`;
  }
};

export const uploadPdfFile = async file => {
  const formData = new FormData();
  const token = store.getState()?.auth?.accessToken;

  formData.append('file', file);

  const headers = {
    Accept: 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/upload-file`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
};
