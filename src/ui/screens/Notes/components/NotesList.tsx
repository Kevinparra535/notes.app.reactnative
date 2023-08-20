// Librerias
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens
import NotesCards from "./NotesCards";

// Componentes

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";

// Tipado
import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";

type Props = {
  viewModel: ResponseModel<NoteModel[]>;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta es una descripción más detallada del componente. Puedes hablar sobre su funcionamiento, cómo se utiliza, etc.
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <NotesList />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const NotesList = ({ viewModel }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={viewModel.data}
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
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: Colors.bg.claro,
  },
});

export default NotesList;
