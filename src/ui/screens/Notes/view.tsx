// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

// Contextos

// Hooks

// ViewModels
import { NotesViewModel } from "./viewModel";

// Screens

// Componentes
import Loader from "@/ui/components/Loader";
import NotesList from "./components/NotesList";

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

const Notes = (): JSX.Element => {
  const { data, refresh } = NotesViewModel();

  // Renders
  if (data.status === "loading") return <Loader />;
  if (data.status === "error") return <Text>Error</Text>;

  return <NotesList viewModel={data} refresh={refresh} />;
};

const styles = StyleSheet.create({});

export default Notes;
