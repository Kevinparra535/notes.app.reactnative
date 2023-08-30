// Librerias
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

// Contextos

// Hooks

// ViewModels
import { NotesViewModel } from "./viewModel";

// Screens

// Componentes
import Loader from "@/ui/components/Loader";
import NotesList from "./components/NotesList";
import { observer } from "mobx-react-lite";

// Navigations

// Imagenes

// Estilos

// Tipado
type Props = {
  route: any;
  navigation: any;
};

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

const Notes: React.FC<Props> = observer(({ route, navigation }) => {
  const [viewModel] = useState(() => new NotesViewModel());

  // Funciones
  const handleSetFavorite = (uuid: string, pin: boolean) => {
    viewModel.setfavoritesNote(uuid, { pin });
  };

  const handleDeleteNote = (uuid: string) => {
    viewModel.deleteNotes(uuid);
  };

  // Renders
  if (viewModel.notes.status === "loading") return <Loader />;
  if (viewModel.notes.status === "error") return <Text>Error</Text>;

  return (
    <>
      <NotesList
        viewModel={viewModel.notes}
        deleteNote={handleDeleteNote}
        refresh={() => viewModel.refresh()}
        setfavoritesNote={handleSetFavorite}
      />
    </>
  );
});

export default Notes;
