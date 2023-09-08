// Librerias
import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";

// Contextos
import RootStoreContext from "@/ui/context/RootStoreContext";

// Hooks

// ViewModels
import { NotesViewModel } from "./viewModel";

// Screens

// Componentes
import Header from "./components/Header";
import Loader from "@/ui/components/Loader";
import NotesList from "./components/NotesList";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";

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

  // Context
  const user = useContext(RootStoreContext);

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
      <Header user={user}>
        <NotesList
          viewModel={viewModel.notes}
          deleteNote={handleDeleteNote}
          refresh={() => viewModel.refresh()}
          setfavoritesNote={handleSetFavorite}
        />

        <StatusBar translucent style="dark" backgroundColor={Colors.claro} />
      </Header>
    </>
  );
});

export default Notes;
