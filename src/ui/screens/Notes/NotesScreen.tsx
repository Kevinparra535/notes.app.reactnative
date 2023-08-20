// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// Contextos

// Hooks

// ViewModels
import { NotesViewModel } from "./NotesViewModel";

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta pantalla renderiza todas las notas
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <NotesScreen />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

type ItemProps = { title: string; content: string };

const NotesScreen = (): JSX.Element => {
  const notes = NotesViewModel();

  const Item = ({ title, content }: ItemProps) => (
    <View>
      <Text>{title}</Text>
      <Text>{content}</Text>
    </View>
  );

  // Renders
  if (!notes) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={notes}
      renderItem={({ item }) => (
        <Item title={item.title} content={item.content} />
      )}
      keyExtractor={(item) => item.uuid}
    />
  );
};

NotesScreen.defaultProps = {};

const styles = StyleSheet.create({});

export default NotesScreen;
