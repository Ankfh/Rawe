import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../Theme/ThemeContext';
import { useAdminSettings } from '../hooks/useAdminSettings';
import UploadCountInput from './UploadCountInput';
import UploadSizeInput from './UploadSizeInput';

const AdminSettingView = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { methods, onSubmit, isLoading, isUpdating } = useAdminSettings();

  const handleBack = () => navigation.goBack();

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.colors.backgroundMain }]}>
        <ActivityIndicator size="large" color={theme.colors.textAccent} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.backgroundMain }]}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: '#1E293B' }]}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <AntDesign name="arrowleft" size={16} color={theme.colors.textPrimary} />
          <Text style={[styles.backButtonText, { color: theme.colors.textPrimary }]}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Admin Settings</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Configure global application limits and behavior
          </Text>
        </View>

        <FormProvider {...methods}>
          <View style={styles.formCard}>
            <View style={styles.sectionHeader}>
              <AntDesign name="clouduploado" size={20} color={theme.colors.textAccent} />
              <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
                Upload Restrictions
              </Text>
            </View>

            <UploadCountInput />
            <UploadSizeInput />

            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: theme.colors.textAccent },
                isUpdating && styles.disabledButton,
              ]}
              onPress={onSubmit}
              disabled={isUpdating}
              activeOpacity={0.8}
            >
              {isUpdating ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.saveButtonText}>Save Settings</Text>
              )}
            </TouchableOpacity>
          </View>
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 24,
  },
  backButtonText: {
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 14,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  saveButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default AdminSettingView;
