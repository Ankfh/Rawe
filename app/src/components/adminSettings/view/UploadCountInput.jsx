import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { useTheme } from '../../Theme/ThemeContext';

const UploadCountInput = () => {
  const { control } = useFormContext();
  const { theme } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
        Max File Upload Limit (Count)
      </Text>
      <Controller
        control={control}
        name="maxUploadFileCount"
        rules={{
          required: 'This field is required',
          min: { value: 1, message: 'Minimum limit is 1' },
          max: { value: 100, message: 'Maximum limit is 100' },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: '#1E293B',
                  color: theme.colors.textPrimary,
                  borderColor: error ? theme.colors.danger : '#334155',
                },
              ]}
              value={value?.toString()}
              onChangeText={(text) => onChange(parseInt(text, 10) || 0)}
              keyboardType="numeric"
              placeholder="e.g. 10"
              placeholderTextColor={theme.colors.textSecondary}
            />
            {error && <Text style={[styles.errorText, { color: theme.colors.danger }]}>{error.message}</Text>}
          </View>
        )}
      />
      <Text style={[styles.helperText, { color: theme.colors.textSecondary }]}>
        Total number of books a user can have in their library.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
});

export default UploadCountInput;
