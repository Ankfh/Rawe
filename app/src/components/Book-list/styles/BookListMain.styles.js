import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#102A43',
    marginBottom: 14,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#486581',
    textAlign: 'center',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#0F6CBD',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  footerWrap: {
    paddingBottom: 22,
    paddingTop: 8,
    alignItems: 'center',
  },
});
