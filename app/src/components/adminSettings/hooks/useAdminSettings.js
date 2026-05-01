import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../services/adminSettingsApi';
import { Alert } from 'react-native';

export const useAdminSettings = () => {
  const { data, isLoading, isError, refetch } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();

  const methods = useForm({
    defaultValues: {
      maxUploadFileCount: 10,
      maxUploadFileSizeMB: 50,
    },
  });

  const { reset } = methods;

  // Sync form with API data when it arrives
  useEffect(() => {
    if (data?.data?.settings) {
      reset({
        maxUploadFileCount: data.data.settings.maxUploadFileCount,
        maxUploadFileSizeMB: data.data.settings.maxUploadFileSizeMB,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateSettings(formData).unwrap();
      Alert.alert('Success', 'Admin settings updated successfully!');
    } catch (error) {
      console.error('[ADMIN][SETTINGS][HOOK] Update failed:', error);
      Alert.alert('Error', error?.data?.message || 'Failed to update settings. Please try again.');
    }
  };

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
    isLoading,
    isUpdating,
    isError,
    refetch,
  };
};
