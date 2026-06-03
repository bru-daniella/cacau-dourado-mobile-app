import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDatabase } from '../../DataBase';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// 1. Cria o Contexto
const DatabaseContext = createContext();

// 2. Cria o Provedor (o "Porteiro")
// A responsabilidade dele é inicializar o banco e só mostrar o app quando estiver pronto.
export function DatabaseProvider({ children }) {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        // Chama a função que abre a conexão e cria as tabelas
        await getDatabase();
        // Se tudo deu certo, marca o banco como pronto
        setIsDbReady(true);
        console.log("Banco de dados pronto para uso.");
      } catch (error) {
        console.error("Falha crítica ao inicializar o banco de dados:", error);
      }
    };

    setupDatabase();
  }, []); // Roda apenas uma vez na montagem do app

  // Enquanto o banco não estiver pronto, mostra uma tela de carregamento
  if (!isDbReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B2412" />
      </View>
    );
  }

  // Quando o banco estiver pronto, mostra o resto do aplicativo
  return (
    <DatabaseContext.Provider value={{ isDbReady }}>
      {children}
    </DatabaseContext.Provider>
  );
}

// Hook para usar o contexto (opcional, mas boa prática)
export function useDatabase() {
  return useContext(DatabaseContext);
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8f6',
  },
});
