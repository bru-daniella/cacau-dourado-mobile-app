import React from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import { Card, Button, Text, useTheme } from 'react-native-paper';
import DescriptionText from './DescriptionText';

export default function ProductCard({
  title = "Brigadeiro Gourmet",
  subtitle = "Doces Tradicionais",
  description = "Delicioso brigadeiro feito com chocolate belga e confeitos de cacau puro.",
  price = "R$ 6,50",
  image = [
    require('../../assets/images/products/img1.jpeg'),
    require('../../assets/images/products/img2.jpeg'),
    require('../../assets/images/products/img3.jpeg')
  ],
  onPressDetails,
  onPressAdd
}) {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <FlatList 
        horizontal 
        showsHorizontalScrollIndicator={true} 
        data={image}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={typeof item === 'string' ? { uri: item } : item} style={styles.images} />
        )}
        style={styles.imageScroll}
      />
      <Card.Title title={title} subtitle={subtitle} />
      <Card.Content>
        <DescriptionText>{description}</DescriptionText>
        <Text variant="titleMedium" style={{ marginTop: 8, color: theme.colors.primary }}>{price}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onPressDetails}>Ver Mais</Button>
        <Button mode="contained" onPress={onPressAdd}>Adicionar</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageScroll: {
    height: 195,
  },
  images: {
    width: 300,
    height: 195,
    marginRight: 4,
  },
});
