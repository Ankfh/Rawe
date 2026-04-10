import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About AI Book Reader</Text>
      <Text style={styles.description}>This is a feature-rich book reading application powered by AI.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default AboutView;
