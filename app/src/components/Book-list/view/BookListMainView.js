import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useBookList from '../hooks/useBookList';
import BookCard from './BookCard';
import { styles } from '../styles/BookListMain.styles';

const BookListMainView = ({ title = 'Books Library' }) => {
  const {
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
    retryInitialLoad,
  } = useBookList();

  const handleDeleteBook = async bookId => {
    try {
      await deleteBook(bookId);
    } catch (error) {
      Alert.alert('Delete Failed', error.message || 'Unable to delete this book.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0F6CBD" />
        <Text style={styles.infoText}>Loading books...</Text>
      </View>
    );
  }

  if (errorMessage && books.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.infoText}>{errorMessage}</Text>
        <TouchableOpacity style={styles.actionButton} onPress={retryInitialLoad}>
          <Text style={styles.actionButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!!title && <Text style={styles.headerTitle}>{title}</Text>}

      <FlatList
        data={books}
        keyExtractor={item => String(item._id)}
        renderItem={({ item }) => (
          <BookCard
            item={item}
            onDeletePress={handleDeleteBook}
            isDeleting={deletingBookIds.includes(String(item._id))}
          />
        )}
        refreshing={refreshing}
        onRefresh={refreshBooks}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.infoText}>No books found yet.</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footerWrap}>
            {loadingMore ? (
              <ActivityIndicator size="small" color="#0F6CBD" />
            ) : null}

            {!loadingMore && hasMore ? (
              <TouchableOpacity style={styles.actionButton} onPress={loadMoreBooks}>
                <Text style={styles.actionButtonText}>Load More</Text>
              </TouchableOpacity>
            ) : null}

            {!hasMore && books.length > 0 ? (
              <Text style={styles.infoText}>No more books to load.</Text>
            ) : null}

            {errorMessage && books.length > 0 ? (
              <Text style={styles.infoText}>{errorMessage}</Text>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

export default BookListMainView;
