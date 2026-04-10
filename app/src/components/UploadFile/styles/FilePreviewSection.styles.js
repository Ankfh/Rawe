import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  details: {
    flex: 1,
    marginLeft: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    letterSpacing: 0.3,
  },
  size: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 6,
    fontWeight: '500',
  },
  removeBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
  },
});
