import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BookListMainView from '../../../components/Book-list/view/BookListMainView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useLogout from '../../auth/hooks/useLogout';
import { useTheme } from '../../../components/Theme/ThemeContext';

const HomeView = () => {
  const navigation = useNavigation();
  const { confirmLogout, isLoggingOut } = useLogout();
  const { theme } = useTheme();

  const navigateToUpload = () => {
    navigation.navigate('privateScreen', { screen: 'UploadBook' });
  };

  const dynamicStyles = getStyles(theme);

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.headerSection}>
        <View style={dynamicStyles.topRow}>
          {/* <Text style={dynamicStyles.text}>AI Book Reader</Text> */}
          {/* <TouchableOpacity onPress={confirmLogout} disabled={isLoggingOut} style={dynamicStyles.logoutButton}>
            <Text style={dynamicStyles.logoutButtonText}>{isLoggingOut ? '...' : 'Logout'}</Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          style={dynamicStyles.uploadButton}
          onPress={navigateToUpload}
          activeOpacity={0.85}
        >
          <AntDesign
            name="clouduploado"
            size={18}
            color={theme.colors.textPrimary}
          />
          <Text style={dynamicStyles.uploadButtonText}>Upload Book</Text>
        </TouchableOpacity>
      </View>

      <BookListMainView />
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundMain,
    },
    headerSection: {
      paddingTop: 30,
      paddingHorizontal: 16,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.glassBorder,
      backgroundColor: theme.colors.backgroundSecondary,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
      fontSize: 26,
      fontWeight: '800',
      color: theme.colors.textPrimary,
      marginBottom: 10,
      letterSpacing: 0.5,
    },
    logoutButton: {
      backgroundColor: theme.colors.glassBackground,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.glassBorder,
      marginBottom: 10,
    },
    logoutButtonText: {
      color: theme.colors.textSecondary,
      fontWeight: '700',
      fontSize: 13,
    },
    uploadButton: {
      alignSelf: 'flex-start',
      ...theme.glassStyles.button,
      paddingHorizontal: 18,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    uploadButtonText: {
      marginLeft: 8,
      color: theme.colors.textPrimary,
      fontSize: 15,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
  });

export default HomeView;
