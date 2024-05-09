// Librerias
import React from "react";
import { StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

// Contextos

// Hooks

// Screens
import NotesCards from "../../../components/Notes/NotesCards";

// Componentes
import NotesListOptions from "./NotesListOptions";
import ListNotesEmpty from "@/ui/components/Notes/ListNotesEmpty";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";

// Tipado
import { NoteModel } from "@/data/models/NoteModel";
import { ResponseModel } from "@/data/models/ResponseModel";

type Props = {
  refresh: () => void;
  deleteNote: (uuid: string) => void;
  viewModel: ResponseModel<NoteModel[]>;
  setfavoritesNote: (uuid: string, pin: boolean) => void;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente usa una libreria de terceros para hacer el scroll de la lista y que los items tengan opciones al deslizar a los lados
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
  setfavoritesNote,
}: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <SwipeListView
      closeOnScroll
      onRefresh={refresh}
      leftOpenValue={100}
      closeOnRowBeginSwipe
      closeOnRowOpen={true}
      rightOpenValue={-100}
      data={viewModel?.data ?? []}
      closeOnRowPress={true}
      style={styles.container}
      keyExtractor={(item) => item.uuid}
      renderHiddenItem={(data) => (
        <NotesListOptions
          uuid={data.item.uuid}
          deleteNote={deleteNote}
          noteIsFavorite={data.item.pin}
          setfavoritesNote={setfavoritesNote}
        />
      )}
      refreshing={viewModel.status === "loading"}
      renderItem={({ item }) => (
        <NotesCards
          uuid={item.uuid}
          tags={item.tags}
          title={item.title}
          color={item.color}
          content={item.content}
        />
      )}
      ListEmptyComponent={ListNotesEmpty}
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
