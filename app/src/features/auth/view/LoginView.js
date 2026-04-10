import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useGoogleAuth from '../hooks/useGoogleAuth';

const LoginView = () => {
  const { startGoogleLogin } = useGoogleAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in with Google to continue</Text>
      <View style={styles.form}>
        <TouchableOpacity style={styles.loginButton} onPress={startGoogleLogin} activeOpacity={0.85}>
          <Text style={styles.loginButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#1A73E8',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default LoginView;
