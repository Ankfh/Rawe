import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import useBookList from '../hooks/useBookList';
import BookCard from './BookCard';
import { useTheme } from '../../Theme/ThemeContext';

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
  
  const { theme } = useTheme();
  const dynamicStyles = getStyles(theme);

  const handleDeleteBook = async bookId => {
    try {
      await deleteBook(bookId);
    } catch (error) {
      Alert.alert('Delete Failed', error.message || 'Unable to delete this book.');
    }
  };

  if (loading) {
    return (
      <View style={[dynamicStyles.container, dynamicStyles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={dynamicStyles.infoText}>Loading books...</Text>
      </View>
    );
  }

  if (errorMessage && books.length === 0) {
    return (
      <View style={[dynamicStyles.container, dynamicStyles.centered]}>
        <Text style={dynamicStyles.infoText}>{errorMessage}</Text>
        <TouchableOpacity style={dynamicStyles.actionButton} onPress={retryInitialLoad}>
          <Text style={dynamicStyles.actionButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      {!!title && <Text style={dynamicStyles.headerTitle}>{title}</Text>}

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
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={dynamicStyles.centered}>
            <Text style={dynamicStyles.infoText}>No books found yet.</Text>
          </View>
        }
        ListFooterComponent={
          <View style={dynamicStyles.footerWrap}>
            {loadingMore ? (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            ) : null}

            {!loadingMore && hasMore ? (
              <TouchableOpacity style={dynamicStyles.actionButton} onPress={loadMoreBooks}>
                <Text style={dynamicStyles.actionButtonText}>Load More</Text>
              </TouchableOpacity>
            ) : null}

            {!hasMore && books.length > 0 ? (
              <Text style={dynamicStyles.infoText}>No more books to load.</Text>
            ) : null}

            {errorMessage && books.length > 0 ? (
              <Text style={dynamicStyles.infoText}>{errorMessage}</Text>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 12,
  },
  actionButton: {
    ...theme.glassStyles.button,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 12,
  },
  actionButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  footerWrap: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default BookListMainView;
