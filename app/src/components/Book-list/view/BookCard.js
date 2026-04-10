import React from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from '../styles/BookCard.styles';
import { formatFileSize } from '../../UploadFile/services/fileValidation';
import AntDesign from 'react-native-vector-icons/AntDesign';

const formatDate = dateValue => {
  try {
    return new Date(dateValue).toLocaleString();
  } catch (_error) {
    return 'N/A';
  }
};

const BookCard = ({ item, onDeletePress, isDeleting }) => {
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
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.metaText}>Uploaded</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PDF</Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {item.originalName}
      </Text>

      <Text style={styles.valueText}>Stored: {item.storedName}</Text>
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
    </View>
  );
};

export default BookCard;
