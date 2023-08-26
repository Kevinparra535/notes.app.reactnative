// Librerias
import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

// Contextos

// Hooks

// Screens
import NotesCards from "./NotesCards";

// Componentes
import NotesListOptions from "./NotesListOptions";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";

// Tipado
import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";
import Spacings from "@/ui/styles/Spacings";

type Props = {
  viewModel: ResponseModel<NoteModel[]>;
  refresh: () => void;
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

const NotesList = ({ viewModel, refresh }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <SwipeListView
      onRefresh={refresh}
      leftOpenValue={200}
      rightOpenValue={-200}
      data={viewModel.data}
      style={styles.container}
      keyExtractor={(item) => item.uuid}
      renderHiddenItem={NotesListOptions}
      refreshing={viewModel.status === "loading"}
      renderItem={({ item }) => (
        <NotesCards
          uuid={item.uuid}
          title={item.title}
          content={item.content}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Spacings.space,
    backgroundColor: Colors.claro,
  },
});

export default NotesList;
