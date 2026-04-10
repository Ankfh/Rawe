import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import UploadInputSection from './UploadInputSection';
import FilePreviewSection from './FilePreviewSection';
import { styles } from '../styles/UploadFileMain.styles';
import useUploadFile from '../hooks/useUploadFile';

/**
 * Main View for UploadFile component
 */
const UploadFileMainView = ({ onUploadSuccess }) => {
  const methods = useForm({
    defaultValues: {
      pdfFile: null,
    },
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <UploadFileContent onUploadSuccess={onUploadSuccess} />
    </FormProvider>
  );
};

const UploadFileContent = ({ onUploadSuccess }) => {
  const { selectedFile, submitUpload, uploadLoading, uploadMessage, uploadSuccess } =
    useUploadFile({ onUploadSuccess });

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Upload Document</Text>
        <UploadInputSection />
        <FilePreviewSection />

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedFile || uploadLoading) && styles.submitButtonDisabled,
          ]}
          onPress={submitUpload}
          disabled={!selectedFile || uploadLoading}
          activeOpacity={0.8}
        >
          {uploadLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>

        {!!uploadMessage && (
          <Text
            style={[
              styles.uploadMessage,
              uploadSuccess ? styles.uploadSuccessText : styles.uploadErrorText,
            ]}
          >
            {uploadMessage}
          </Text>
        )}
      </View>
  );
};

export default UploadFileMainView;
