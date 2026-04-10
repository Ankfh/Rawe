import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BookListMainView from '../../../components/Book-list/view/BookListMainView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useLogout from '../../auth/hooks/useLogout';

const HomeView = () => {
  const navigation = useNavigation();
  const { confirmLogout, isLoggingOut } = useLogout();

  const navigateToUpload = () => {
    navigation.navigate('UploadBook');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.topRow}>
          <Text style={styles.text}>AI Book Reader</Text>
          <TouchableOpacity onPress={confirmLogout} disabled={isLoggingOut} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>{isLoggingOut ? '...' : 'Logout'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={navigateToUpload} activeOpacity={0.85}>
          <AntDesign name="clouduploado" size={18} color="#FFFFFF" />
          <Text style={styles.uploadButtonText}>Upload Book</Text>
        </TouchableOpacity>
      </View>

      <BookListMainView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  headerSection: {
    paddingTop: 20,
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '800',
    color: '#102A43',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#E8EEF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: '#334E68',
    fontWeight: '700',
    fontSize: 13,
  },
  uploadButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#0F6CBD',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButtonText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default HomeView;
