import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function AppButton({ 
  variant = 'primary', 
  children, 
  style, 
  ...props 
}) {
  // Mapeia as variantes do nosso componente para os 'modes' do react-native-paper
  const modeMap = {
    primary: 'contained',
    secondary: 'outlined',
    text: 'text',
  };

  const mode = modeMap[variant] || 'contained';

  return (
    <Button 
      mode={mode} 
      style={[styles.button, style]} 
      {...props}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
  },
});
