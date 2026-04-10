import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E8EEF8',
    shadowColor: '#0E2A47',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#E9F6EF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#147A3D',
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    color: '#102A43',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  valueText: {
    color: '#243B53',
    fontSize: 13,
    marginBottom: 4,
  },
  metaText: {
    color: '#486581',
    fontSize: 12,
  },
  actionsRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#FFE9E8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButtonDisabled: {
    opacity: 0.65,
  },
  deleteButtonText: {
    marginLeft: 6,
    color: '#B42318',
    fontSize: 13,
    fontWeight: '700',
  },
});
