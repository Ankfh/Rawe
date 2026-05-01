import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../../components/Theme/ThemeContext';

const AdminView = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const navigateToSettings = () => {
    navigation.navigate('adminScreen', { screen: 'AdminSettings' });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.backgroundMain }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>Admin Control</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Manage application features and system configurations
        </Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.card}
          onPress={navigateToSettings}
          activeOpacity={0.8}
        >
          <View style={[styles.iconBox, { backgroundColor: '#1E293B' }]}>
            <AntDesign name="setting" size={24} color={theme.colors.textAccent} />
          </View>
          <View style={styles.cardText}>
            <Text style={[styles.cardTitle, { color: theme.colors.textPrimary }]}>
              Application Settings
            </Text>
            <Text style={[styles.cardDesc, { color: theme.colors.textSecondary }]}>
              Configure upload limits, file size restrictions, and global preferences
            </Text>
          </View>
          <AntDesign name="right" size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#1E293B',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardText: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});

export default AdminView;

