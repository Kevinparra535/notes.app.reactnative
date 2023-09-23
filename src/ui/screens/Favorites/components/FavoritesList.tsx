// Librerias
import NotesCards from "@/ui/components/Notes/NotesCards";
import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes
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
  viewModel: ResponseModel<NoteModel[]>;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de renderizar las notas que estan en favoritos pero sin el feature de deslizar el item
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <FavoritesList />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const FavoritesList = ({ viewModel, refresh }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <FlatList
      onRefresh={refresh}
      data={viewModel.data}
      style={styles.container}
      keyExtractor={(item) => item.uuid}
      ListEmptyComponent={ListNotesEmpty}
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

export default FavoritesList;
