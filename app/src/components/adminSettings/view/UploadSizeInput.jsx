import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { useTheme } from '../../Theme/ThemeContext';

const UploadSizeInput = () => {
  const { control } = useFormContext();
  const { theme } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
        Max File Size Limit (MB)
      </Text>
      <Controller
        control={control}
        name="maxUploadFileSizeMB"
        rules={{
          required: 'This field is required',
          min: { value: 1, message: 'Minimum size is 1MB' },
          max: { value: 500, message: 'Maximum size is 500MB' },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <View style={styles.inputWrapper}>
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
                placeholder="e.g. 50"
                placeholderTextColor={theme.colors.textSecondary}
              />
              <View style={styles.suffix}>
                <Text style={{ color: theme.colors.textSecondary, fontWeight: '700' }}>MB</Text>
              </View>
            </View>
            {error && <Text style={[styles.errorText, { color: theme.colors.danger }]}>{error.message}</Text>}
          </View>
        )}
      />
      <Text style={[styles.helperText, { color: theme.colors.textSecondary }]}>
        Maximum size allowed for a single PDF upload.
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    fontSize: 16,
    paddingRight: 60,
  },
  suffix: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
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

export default UploadSizeInput;
