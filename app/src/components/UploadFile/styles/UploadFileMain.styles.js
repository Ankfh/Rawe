import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#F8FAFC',
    alignSelf: 'flex-start',
    letterSpacing: 0.5,
  },
  submitButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  submitButtonDisabled: {
    backgroundColor: '#1E3A5F',
    borderColor: '#334155',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  uploadMessage: {
    marginTop: 12,
    width: '100%',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '500',
  },
  uploadSuccessText: {
    color: '#10B981',
  },
  uploadErrorText: {
    color: '#EF4444',
  },
});
