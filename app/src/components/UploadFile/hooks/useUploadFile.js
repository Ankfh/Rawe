import { useFormContext } from 'react-hook-form';
import { pick, types, isCancel } from '@react-native-documents/picker';
import { isPdf } from '../services/fileValidation';
import { uploadPdfFile } from '../services/uploadFileApi';
import { Alert } from 'react-native';
import { useState } from 'react';

/**
 * Custom hook for file upload logic
 */
const useUploadFile = ({ onUploadSuccess } = {}) => {
  const { setValue, watch, clearErrors, setError } = useFormContext();
  const selectedFile = watch('pdfFile');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = async () => {
    try {
      const [result] = await pick({
        type: [types.pdf],
        // The new API doesn't use copyTo directly in pick options anymore
        // If you need a local copy, use keepLocalCopy utility from the library
      });

      if (isPdf(result)) {
        setValue('pdfFile', result, { shouldValidate: true });
        clearErrors('pdfFile');
        setUploadMessage('');
        setUploadSuccess(false);
      } else {
        setError('pdfFile', {
          type: 'manual',
          message: 'Only PDF files are allowed',
        });
        Alert.alert('Error', 'Please select a valid PDF file.');
      }
    } catch (err) {
      if (isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error('DocumentPicker Error: ', err);
        Alert.alert('Error', 'Failed to select file.');
      }
    }
  };

  const removeFile = () => {
    setValue('pdfFile', null);
    setUploadMessage('');
    setUploadSuccess(false);
  };

  const submitUpload = async () => {
    if (!selectedFile) {
      setError('pdfFile', {
        type: 'manual',
        message: 'Please select a PDF file first',
      });
      Alert.alert(
        'Missing File',
        'Please select a PDF file before submitting.',
      );
      return;
    }

    setUploadLoading(true);
    setUploadMessage('');
    setUploadSuccess(false);

    try {
      const response = await uploadPdfFile(selectedFile);
      setUploadSuccess(true);
      setUploadMessage(response?.message || 'File uploaded successfully.');
      Alert.alert(
        'Success',
        response?.message || 'File uploaded successfully.',
      );

      if (onUploadSuccess) {
        onUploadSuccess(response?.data);
      }
    } catch (error) {
      console.log('ERROR in err', error);
      setUploadSuccess(false);
      setUploadMessage(error.message || 'Upload failed. Please try again.');
      Alert.alert(
        'Upload Failed',
        error.message || 'Upload failed. Please try again.',
      );
    } finally {
      setUploadLoading(false);
    }
  };

  return {
    selectedFile,
    handleFileSelect,
    removeFile,
    submitUpload,
    uploadLoading,
    uploadMessage,
    uploadSuccess,
  };
};

export default useUploadFile;
