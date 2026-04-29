import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoginView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Acesso à conta</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 250,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#733E10',
  },
  title: {
    color: '#BF8F36',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#F2DCB3',
    fontSize: 16,
  },
});
