import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useUploadFile from '../hooks/useUploadFile';
import { formatFileSize } from '../services/fileValidation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from '../styles/FilePreviewSection.styles';

/**
 * Modular view for displaying selected file details
 */
const FilePreviewSection = () => {
  const { selectedFile, removeFile } = useUploadFile();

  if (!selectedFile) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AntDesign name="pdffile1" size={32} color="#FF3B30" />
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1}>
            {selectedFile.name}
          </Text>
          <Text style={styles.size}>
            {formatFileSize(selectedFile.size || 0)}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.removeBtn} 
          onPress={removeFile}
          activeOpacity={0.7}
        >
          <AntDesign name="closecircle" size={24} color="#8E8E93" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilePreviewSection;
