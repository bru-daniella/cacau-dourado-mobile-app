import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import RecommendationCard from './RecommendationCard';

// Este componente cria uma "roleta" de produtos.
// Ele é flexível e recebe os produtos já filtrados e o link para "Ver tudo".
export default function ProductCarousel({ titulo, produtos, verTudoLink }) {
  const router = useRouter();

  // Se não houver produtos para esta roleta, o componente não renderiza nada
  if (!produtos || produtos.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho da Roleta (ex: "Recomendações") */}
      <View style={styles.headerContainer}>
        <Text style={styles.titulo} variant="titleLarge">
          {titulo}
        </Text>
        <Button
          mode="text"
          textColor='#77574D'
          onPress={() => router.push(verTudoLink)}
          compact
        >
          Ver tudo
        </Button>
      </View>

      {/* A "Roleta" em si */}
      <View style={styles.roletaContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {produtos.map((doce) => (
            <RecommendationCard key={doce.id} produto={doce} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24, // Espaço entre as roletas
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  titulo: {
    fontFamily: "Georgia",
    fontWeight: "bold",
    color: "#3e2723",
  },
  roletaContainer: {
    height: 190,
  },
  scrollContent: {
    paddingHorizontal: 16,
  }
});
