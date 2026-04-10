import { Platform } from 'react-native';
import { BASE_URL } from '../../../baseUrl/data/baseUrls';

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

  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/api/upload-file`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
};
