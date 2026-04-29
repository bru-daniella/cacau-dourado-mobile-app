import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function DescriptionText({ children, style, ...props }) {
  const theme = useTheme();

  return (
    <Text 
      variant="bodyMedium" 
      style={[
        styles.text, 
        { color: theme.colors.onSurfaceVariant }, 
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 20,
    marginTop: 4,
    marginBottom: 8,
  },
});
