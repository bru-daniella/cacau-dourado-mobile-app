import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export default function AdminUserCard({ usuario }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{usuario.nome}</Text>
        <Text variant="bodyMedium">E-mail: {usuario.email}</Text>
        <Text variant="bodySmall" style={{ color: "gray" }}>ID: {usuario.id}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    backgroundColor: "#FFF"
  }
});
