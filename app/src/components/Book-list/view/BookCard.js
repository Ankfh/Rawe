import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { formatFileSize } from '../../UploadFile/services/fileValidation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../Theme/ThemeContext';

const formatDate = dateValue => {
  try {
    return new Date(dateValue).toLocaleString();
  } catch (_error) {
    return 'N/A';
  }
};

const BookCard = ({ item, onDeletePress, isDeleting }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dynamicStyles = getStyles(theme);

  const handlePress = () => {
    if (item.processingStatus === 'completed') {
      navigation.navigate('privateScreen', {
        screen: 'ReaderQA',
        params: {
          bookId: item._id,
          bookTitle: item.originalName,
        },
      });
    } else if (item.processingStatus === 'failed') {
      Alert.alert(
        'Processing Failed',
        'Something went wrong during AI analysis. Please delete and re-upload.',
      );
    } else {
      Alert.alert(
        'AI Analysis',
        'This book is still being processed. Please wait a moment.',
      );
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
      ],
    );
  };

  return (
    <TouchableOpacity
      style={dynamicStyles.card}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={dynamicStyles.topRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={dynamicStyles.metaText}>Uploaded</Text>
          {item.processingStatus === 'completed' && (
            <View
              style={[
                dynamicStyles.badge,
                {
                  backgroundColor: theme.colors.successBackground,
                  marginLeft: 8,
                },
              ]}
            >
              <Text
                style={[
                  dynamicStyles.badgeText,
                  { color: theme.colors.success },
                ]}
              >
                Ready
              </Text>
            </View>
          )}
        </View>
        <View style={dynamicStyles.badge}>
          <Text style={dynamicStyles.badgeText}>PDF</Text>
        </View>
      </View>

      <Text style={dynamicStyles.title} numberOfLines={2}>
        {item.originalName}
      </Text>

      <Text style={dynamicStyles.valueText}>
        Size: {formatFileSize(item.size || 0)}
      </Text>
      <Text style={dynamicStyles.metaText}>
        Uploaded At: {formatDate(item.uploadedAt)}
      </Text>

      <View style={dynamicStyles.actionsRow}>
        <TouchableOpacity
          style={[
            dynamicStyles.deleteButton,
            isDeleting && dynamicStyles.deleteButtonDisabled,
          ]}
          onPress={handleDeleteConfirm}
          disabled={isDeleting}
          activeOpacity={0.8}
        >
          {isDeleting ? (
            <ActivityIndicator size="small" color={theme.colors.danger} />
          ) : (
            <>
              <AntDesign name="delete" size={14} color={theme.colors.danger} />
              <Text style={dynamicStyles.deleteButtonText}>Delete</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    card: {
      backgroundColor: '#1E293B',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#475569',
      borderTopWidth: 3,
      borderTopColor: '#3B82F6',
      padding: 20,
      marginBottom: 18,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.45,
      shadowRadius: 16,
      elevation: 12,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    badge: {
      backgroundColor: '#0F2942',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: '#1E4976',
    },
    badgeText: {
      color: theme.colors.textAccent,
      fontWeight: '700',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 17,
      fontWeight: '700',
      marginBottom: 10,
      lineHeight: 24,
    },
    valueText: {
      color: theme.colors.textSecondary,
      fontSize: 13,
      marginBottom: 4,
    },
    metaText: {
      color: theme.colors.textSecondary,
      fontSize: 12,
    },
    actionsRow: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderTopWidth: 1,
      borderTopColor: '#334155',
      paddingTop: 14,
    },
    deleteButton: {
      backgroundColor: '#2D1518',
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#5C2226',
    },
    deleteButtonDisabled: {
      opacity: 0.5,
    },
    deleteButtonText: {
      marginLeft: 6,
      color: theme.colors.danger,
      fontSize: 13,
      fontWeight: '700',
    },
  });

export default BookCard;
