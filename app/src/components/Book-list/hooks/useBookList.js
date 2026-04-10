import { useCallback, useEffect, useState } from 'react';
import { deleteBookById, fetchBooksPaginated } from '../services/booksApi';

const PAGE_SIZE = 5;

const useBookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deletingBookIds, setDeletingBookIds] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const loadInitialBooks = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetchBooksPaginated({ limit: PAGE_SIZE });

      setBooks(response?.data || []);
      setNextCursor(response?.pagination?.nextCursor || null);
      setHasMore(Boolean(response?.pagination?.hasMore));
    } catch (error) {
      setErrorMessage(error.message || 'Failed to load books');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshBooks = useCallback(async () => {
    setRefreshing(true);
    setErrorMessage('');

    try {
      const response = await fetchBooksPaginated({ limit: PAGE_SIZE });

      setBooks(response?.data || []);
      setNextCursor(response?.pagination?.nextCursor || null);
      setHasMore(Boolean(response?.pagination?.hasMore));
    } catch (error) {
      setErrorMessage(error.message || 'Failed to refresh books');
    } finally {
      setRefreshing(false);
    }
  }, []);

  const loadMoreBooks = useCallback(async () => {
    if (!hasMore || !nextCursor || loadingMore) {
      return;
    }

    setLoadingMore(true);
    setErrorMessage('');

    try {
      const response = await fetchBooksPaginated({
        limit: PAGE_SIZE,
        cursor: nextCursor,
      });

      setBooks(prev => [...prev, ...(response?.data || [])]);
      setNextCursor(response?.pagination?.nextCursor || null);
      setHasMore(Boolean(response?.pagination?.hasMore));
    } catch (error) {
      setErrorMessage(error.message || 'Failed to load more books');
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, nextCursor]);

  useEffect(() => {
    loadInitialBooks();
  }, [loadInitialBooks]);

  const deleteBook = useCallback(async bookId => {
    const normalizedBookId = String(bookId);
    setDeletingBookIds(prev => [...prev, normalizedBookId]);
    setErrorMessage('');

    try {
      await deleteBookById(normalizedBookId);
      setBooks(prev => prev.filter(book => String(book._id) !== normalizedBookId));
    } catch (error) {
      setErrorMessage(error.message || 'Failed to delete book');
      throw error;
    } finally {
      setDeletingBookIds(prev => prev.filter(id => id !== normalizedBookId));
    }
  }, []);

  return {
    books,
    loading,
    refreshing,
    loadingMore,
    errorMessage,
    hasMore,
    deletingBookIds,
    refreshBooks,
    loadMoreBooks,
    deleteBook,
    retryInitialLoad: loadInitialBooks,
  };
};

export default useBookList;
