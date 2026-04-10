import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#007AFF',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    transition: 'background-color 0.2s ease',
  },
  uploadText: {
    marginTop: 12,
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  hintText: {
    marginTop: 6,
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
  },
});
