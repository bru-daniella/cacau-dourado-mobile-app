import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Divider, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import AuthForm from "./components/AuthForm";
import ProductCard from "./components/ProductCard";
import AppButton from "./components/AppButton";

export default function Showcase() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        <Appbar.BackAction onPress={() => router.back()} color={theme.colors.onPrimary} />
        <Appbar.Content title="Showcase de Componentes" color={theme.colors.onPrimary} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Seção de Tipografia */}
        <Text variant="headlineMedium" style={styles.sectionTitle}>Tipografia</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="displaySmall">Display Small</Text>
            <Text variant="headlineSmall">Headline Small</Text>
            <Text variant="titleLarge">Title Large</Text>
            <Text variant="bodyLarge">Body Large (texto padrão para descrições)</Text>
            <Text variant="labelLarge" style={{ color: theme.colors.primary }}>Label Large (para destaques)</Text>
          </Card.Content>
        </Card>

        {/* Seção de Botões */}
        <Text variant="headlineMedium" style={styles.sectionTitle}>Botões</Text>
        <Card style={styles.card}>
          <Card.Content style={styles.row}>
            <AppButton variant="primary" onPress={() => {}}>Principal</AppButton>
            <AppButton variant="secondary" onPress={() => {}}>Secundário</AppButton>
            <AppButton variant="text" onPress={() => {}}>Texto</AppButton>
          </Card.Content>
        </Card>

        {/* Seção de Cards (Exemplo de Produto) */}
        <Text variant="headlineMedium" style={styles.sectionTitle}>Cards</Text>
        <ProductCard 
          onPressDetails={() => console.log('Ver mais clicado')}
          onPressAdd={() => console.log('Adicionar clicado')}
        />

        {/* Seção de Autenticação */}
        <Text variant="headlineMedium" style={styles.sectionTitle}>Autenticação (AuthForm)</Text>
        <AuthForm onSubmit={(data) => console.log('Auth Form data:', data)} />

        <Divider style={styles.divider} />
        <Text style={styles.footerText}>Cacau Dourado - Guia de Componentes</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-around',
  },
  gap: {
    gap: 12,
  },
  divider: {
    marginVertical: 24,
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
  }
});