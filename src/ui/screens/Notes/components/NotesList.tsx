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
import Spacings from "@/ui/styles/Spacings";

// Tipado
import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";

type Props = {
  refresh: () => void;
  deleteNote: (uuid: string) => void;
  viewModel: ResponseModel<NoteModel[]>;
  setFavouritesNote: (uuid: string, pin: boolean) => void;
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

const NotesList = ({
  viewModel,
  refresh,
  deleteNote,
  setFavouritesNote,
}: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <SwipeListView
      onRefresh={refresh}
      leftOpenValue={100}
      rightOpenValue={-100}
      data={viewModel.data}
      style={styles.container}
      keyExtractor={(item) => item.uuid}
      renderHiddenItem={(data) => (
        <NotesListOptions
          uuid={data.item.uuid}
          deleteNote={deleteNote}
          noteIsFavorite={data.item.pin}
          setFavouritesNote={setFavouritesNote}
        />
      )}
      refreshing={viewModel.status === "loading"}
      renderItem={({ item }) => (
        <NotesCards
          uuid={item.uuid}
          title={item.title}
          color={item.color}
          content={item.content}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.claro,
  },
});

export default NotesList;
