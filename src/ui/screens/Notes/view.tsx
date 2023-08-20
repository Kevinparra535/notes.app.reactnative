// Librerias
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";

// Contextos

// Hooks

// ViewModels
import { NotesViewModel } from "./viewModel";

// Screens

// Componentes
import Loader from "@/ui/components/Loader";
import NotesCards from "./components/NotesCards";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";

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
  const notes = NotesViewModel();

  // Renders
  if (notes.status === "loading") return <Loader />;
  if (notes.status === "error") return <Text>Error</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notes.data}
        renderItem={({ item }) => (
          <NotesCards title={item.title} content={item.content} />
        )}
        keyExtractor={(item) => item.uuid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg.claro,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default Notes;
