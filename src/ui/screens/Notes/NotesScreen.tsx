// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

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

const NotesScreen = (): JSX.Element => {
  const noteId = "hwYk7R2KcMBPy9RElbnK";
  const { note } = NotesViewModel(noteId);

  // Renders
  if (!note) return <Text>Loading...</Text>;


  return (
    <View>
      <Text>{note.title}</Text>
      <Text>{note.content}</Text>
    </View>
  );
};

NotesScreen.defaultProps = {};

const styles = StyleSheet.create({});

export default NotesScreen;
