// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Contextos

// Hooks

// ViewModels
import { OneNoteViewModel } from "./viewModel";

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
 * Esta pantalla solo muestra una nota en base a los parametros
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <OneNoteScreen />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const OneNote = (): JSX.Element => {
  const noteId = "hwYk7R2KcMBPy9RElbnK";
  const { note } = OneNoteViewModel(noteId);

  // Renders
  if (!note) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{note.title}</Text>
      <Text>{note.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default OneNote;
