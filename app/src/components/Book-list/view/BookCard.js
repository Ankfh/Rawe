import React from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from '../styles/BookCard.styles';
import { formatFileSize } from '../../UploadFile/services/fileValidation';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

const formatDate = dateValue => {
  try {
    return new Date(dateValue).toLocaleString();
  } catch (_error) {
    return 'N/A';
  }
};

const BookCard = ({ item, onDeletePress, isDeleting }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (item.processingStatus === 'completed') {
      navigation.navigate('ReaderQA', { 
        bookId: item._id, 
        bookTitle: item.originalName 
      });
    } else if (item.processingStatus === 'failed') {
      Alert.alert('Processing Failed', 'Something went wrong during AI analysis. Please delete and re-upload.');
    } else {
      Alert.alert('AI Analysis', 'This book is still being processed. Please wait a moment.');
    }
  };

  const handleDeleteConfirm = () => {
    Alert.alert(
      'Delete Book',
      `Are you sure you want to delete ${item.originalName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDeletePress(item._id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress} 
      activeOpacity={0.9}
    >
      <View style={styles.topRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.metaText}>Uploaded</Text>
          {item.processingStatus === 'completed' && (
            <View style={[styles.badge, { backgroundColor: '#027A48', marginLeft: 8 }]}>
              <Text style={styles.badgeText}>Ready</Text>
            </View>
          )}
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PDF</Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {item.originalName}
      </Text>

      <Text style={styles.valueText}>Size: {formatFileSize(item.size || 0)}</Text>
      <Text style={styles.metaText}>Uploaded At: {formatDate(item.uploadedAt)}</Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.deleteButton, isDeleting && styles.deleteButtonDisabled]}
          onPress={handleDeleteConfirm}
          disabled={isDeleting}
          activeOpacity={0.8}
        >
          {isDeleting ? (
            <ActivityIndicator size="small" color="#B42318" />
          ) : (
            <>
              <AntDesign name="delete" size={14} color="#B42318" />
              <Text style={styles.deleteButtonText}>Delete</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
