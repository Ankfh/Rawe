import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UploadFileMainView from '../../../components/UploadFile/view/UploadFileMainView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../../components/Theme/ThemeContext';

const UploadView = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleUploadSuccess = () => {
    navigation.navigate('authScreen');
  };

  const dynamicStyles = getStyles(theme);

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      <TouchableOpacity style={dynamicStyles.backButton} onPress={handleBack} activeOpacity={0.8}>
        <AntDesign name="arrowleft" size={16} color={theme.colors.textPrimary} />
        <Text style={dynamicStyles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={dynamicStyles.title}>Upload Book</Text>
      <Text style={dynamicStyles.subtitle}>Select a PDF file to upload and analyze with AI</Text>
      <View style={dynamicStyles.contentWrap}>
        <UploadFileMainView onUploadSuccess={handleUploadSuccess} />
      </View>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundMain,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 24,
  },
  contentWrap: {
    width: '100%',
  },
});

export default UploadView;
