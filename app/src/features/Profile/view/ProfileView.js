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

const ProfileView = () => {
  const { profile, confirmLogout, isLoggingOut } = useProfileScreen();
  const hasAvatar = Boolean(profile.avatar);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F6FB" />
      <View style={styles.container}>
        <View style={styles.backgroundBubbleOne} />
        <View style={styles.backgroundBubbleTwo} />

        <View style={styles.headerCard}>
          <Text style={styles.sectionLabel}>Profile</Text>
          <Text style={styles.heading}>Your Account</Text>
          <Text style={styles.subheading}>Manage your identity and session</Text>

          <View style={styles.avatarRow}>
            <View style={styles.avatarShell}>
              {hasAvatar ? (
                <Image source={{ uri: profile.avatar }} style={styles.avatarImage} resizeMode="cover" />
              ) : (
                <Text style={styles.avatarFallbackText}>{profile.initials}</Text>
              )}
            </View>

            <View style={styles.userMetaBlock}>
              <Text style={styles.userName} numberOfLines={1}>
                {profile.name}
              </Text>
              <Text style={styles.userEmail} numberOfLines={1}>
                {profile.email}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Security</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={confirmLogout}
            disabled={isLoggingOut}
            activeOpacity={0.85}
          >
            <View style={styles.logoutIconWrap}>
              <AntDesign name="logout" size={16} color="#ffffff" />
            </View>
            <Text style={styles.logoutButtonText}>{isLoggingOut ? 'Signing out...' : 'Logout'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F6FB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: '#F2F6FB',
  },
  backgroundBubbleOne: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#D9EEFF',
    top: -60,
    right: -60,
  },
  backgroundBubbleTwo: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#E8FFE8',
    bottom: 30,
    left: -65,
  },
  headerCard: {
    backgroundColor: '#0B1D33',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 18,
    marginTop: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 7,
  },
  sectionLabel: {
    fontSize: 13,
    color: '#A8C8E8',
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subheading: {
    marginTop: 6,
    fontSize: 14,
    color: '#C7DAEF',
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
    backgroundColor: '#123A63',
    borderWidth: 3,
    borderColor: '#52A7FF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallbackText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  userMetaBlock: {
    marginLeft: 14,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  userEmail: {
    marginTop: 5,
    color: '#ADD3FB',
    fontSize: 14,
    fontWeight: '500',
  },
  actionsCard: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0EAF4',
  },
  actionsTitle: {
    fontSize: 16,
    color: '#183B56',
    fontWeight: '800',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#E53935',
    borderRadius: 14,
    minHeight: 50,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#B61B1B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileView;
