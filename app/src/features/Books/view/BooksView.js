import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BookListMainView from '../../../components/Book-list/view/BookListMainView';

const BooksView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BookListMainView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
});

export default BooksView;
