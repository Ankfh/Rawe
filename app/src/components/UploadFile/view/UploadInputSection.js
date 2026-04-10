import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useUploadFile from '../hooks/useUploadFile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from '../styles/UploadInputSection.styles';

/**
 * Modular view for file selection button
 */
const UploadInputSection = () => {
  const { handleFileSelect } = useUploadFile();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.uploadBox} 
        onPress={handleFileSelect}
        activeOpacity={0.7}
      >
        <AntDesign name="clouduploado" size={40} color="#007AFF" />
        <Text style={styles.uploadText}>Select PDF File</Text>
        <Text style={styles.hintText}>PDF files only</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadInputSection;
