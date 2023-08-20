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
  const viewModel = NotesViewModel();

  // Renders
  if (viewModel.status === "loading") return <Loader />;
  if (viewModel.status === "error") return <Text>Error</Text>;

  return <NotesList viewModel={viewModel} />;
};

const styles = StyleSheet.create({});

export default Notes;
