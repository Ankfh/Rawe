import { BASE_URL } from '../../../baseUrl/data/baseUrls';

const parseErrorMessage = async response => {
  try {
    const errorJson = await response.json();
    return errorJson.message || 'Failed to fetch books';
  } catch (_error) {
    return `Failed to fetch books with status ${response.status}`;
  }
};

export const fetchBooksPaginated = async ({ limit = 5, cursor = null }) => {
  const params = new URLSearchParams({
    limit: String(limit),
  });

  if (cursor) {
    params.append('cursor', cursor);
  }

  const response = await fetch(`${BASE_URL}/api/upload-file/books?${params.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
};

export const deleteBookById = async bookId => {
  const response = await fetch(`${BASE_URL}/api/upload-file/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
};
