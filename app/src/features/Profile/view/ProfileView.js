import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useProfileScreen from '../hooks/useProfileScreen';
import { useTheme } from '../../../components/Theme/ThemeContext';

const ProfileView = () => {
  const { profile, confirmLogout, isLoggingOut } = useProfileScreen();
  const { theme } = useTheme();
  const hasAvatar = Boolean(profile.avatar);

  const dynamicStyles = getStyles(theme);

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.backgroundMain} />
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.backgroundBubbleOne} />
        <View style={dynamicStyles.backgroundBubbleTwo} />

        <View style={dynamicStyles.headerCard}>
          <Text style={dynamicStyles.sectionLabel}>Profile</Text>
          <Text style={dynamicStyles.heading}>Your Account</Text>
          <Text style={dynamicStyles.subheading}>Manage your identity and session</Text>

          <View style={dynamicStyles.avatarRow}>
            <View style={dynamicStyles.avatarShell}>
              {hasAvatar ? (
                <Image source={{ uri: profile.avatar }} style={dynamicStyles.avatarImage} resizeMode="cover" />
              ) : (
                <Text style={dynamicStyles.avatarFallbackText}>{profile.initials}</Text>
              )}
            </View>

            <View style={dynamicStyles.userMetaBlock}>
              <Text style={dynamicStyles.userName} numberOfLines={1}>
                {profile.name}
              </Text>
              <Text style={dynamicStyles.userEmail} numberOfLines={1}>
                {profile.email}
              </Text>
            </View>
          </View>
        </View>

        <View style={dynamicStyles.actionsCard}>
          <Text style={dynamicStyles.actionsTitle}>Security</Text>
          <TouchableOpacity
            style={dynamicStyles.logoutButton}
            onPress={confirmLogout}
            disabled={isLoggingOut}
            activeOpacity={0.85}
          >
            <View style={dynamicStyles.logoutIconWrap}>
              <AntDesign name="logout" size={16} color={theme.colors.danger} />
            </View>
            <Text style={dynamicStyles.logoutButtonText}>{isLoggingOut ? 'Signing out...' : 'Logout'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.backgroundMain,
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: theme.colors.backgroundMain,
  },
  backgroundBubbleOne: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: theme.colors.primary,
    opacity: 0.1,
    top: -60,
    right: -80,
  },
  backgroundBubbleTwo: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.accent,
    opacity: 0.1,
    bottom: 30,
    left: -65,
  },
  headerCard: {
    ...theme.glassStyles.card,
    paddingVertical: 24,
    paddingHorizontal: 18,
    marginTop: 14,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 7,
  },
  sectionLabel: {
    fontSize: 13,
    color: theme.colors.textAccent,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  subheading: {
    marginTop: 6,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  avatarRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarShell: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallbackText: {
    color: theme.colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
  },
  userMetaBlock: {
    marginLeft: 14,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    color: theme.colors.textPrimary,
    fontWeight: '800',
  },
  userEmail: {
    marginTop: 5,
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  actionsCard: {
    marginTop: 24,
    ...theme.glassStyles.card,
    padding: 18,
  },
  actionsTitle: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  logoutButton: {
    backgroundColor: theme.colors.dangerBackground,
    borderRadius: 14,
    minHeight: 55,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoutButtonText: {
    color: theme.colors.danger,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default ProfileView;
