import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import useGoogleAuth from '../hooks/useGoogleAuth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../../components/Theme/ThemeContext';

const LoginView = () => {
  const { startGoogleLogin, isLoggingIn } = useGoogleAuth();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Decorative background orbs */}
      <View style={styles.orbTop} />
      <View style={styles.orbBottom} />

      {/* App Branding */}
      <View style={styles.brandSection}>
        <View style={styles.logoWrap}>
          <AntDesign name="book" size={36} color="#3B82F6" />
        </View>
        <Text style={styles.appName}>Rawe</Text>
        <Text style={styles.tagline}>AI-Powered Book Reader</Text>
      </View>

      {/* Google Sign In */}
      <View style={styles.form}>
        <TouchableOpacity
          style={[styles.googleButton, isLoggingIn && styles.googleButtonDisabled]}
          onPress={startGoogleLogin}
          disabled={isLoggingIn}
          activeOpacity={0.85}
        >
          {isLoggingIn ? (
            <ActivityIndicator size="small" color="#3B82F6" />
          ) : (
            <>
              <View style={styles.googleIconWrap}>
                <AntDesign name="google" size={20} color="#EA4335" />
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0F172A',
  },
  orbTop: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#3B82F6',
    opacity: 0.08,
    top: -80,
    right: -100,
  },
  orbBottom: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#8B5CF6',
    opacity: 0.08,
    bottom: -60,
    left: -80,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  googleButtonDisabled: {
    opacity: 0.7,
  },
  googleIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleButtonText: {
    color: '#1F2937',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  termsText: {
    color: '#475569',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
  },
});

export default LoginView;
