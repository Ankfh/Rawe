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
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  details: {
    flex: 1,
    marginLeft: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    letterSpacing: 0.3,
  },
  size: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 6,
    fontWeight: '500',
  },
  removeBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#2D1518',
  },
});
