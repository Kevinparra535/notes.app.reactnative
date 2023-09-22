// Librerias
import Colors from "@/ui/styles/Colors";
import React, { useContext, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// Contextos
import RootStoreContext from "@/ui/context/RootStoreContext";

// Hooks

// Screens

// Componentes
import Header from "../../components/Header";
import NotesList from "../Notes/components/NotesList";
import Loader from "@/ui/components/Loader";
import { FavoritesViewModel } from "./viewModel";
import { observer } from "mobx-react-lite";

// Navigations

// Imagenes

// Estilos

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta pantalla mostrara en lista las notas seleccionadas como favoritas
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <Favorites />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Favorites: React.FC = observer((): JSX.Element => {
  // Estados
  const [viewModel] = useState(() => new FavoritesViewModel());

  // Contextos

  // Hooks

  // Funciones
  const handleSetFavorite = (uuid: string, pin: boolean) => {
    viewModel.setfavoritesNote(uuid, { pin });
  };

  const handleDeleteNote = (uuid: string) => {
    viewModel.deleteNotes(uuid);
  };

  // UseEffects
  console.log(viewModel.notes.data);

  // Renders

  if (viewModel.notes.status === "loading") return <Loader />;
  if (viewModel.notes.status === "error") return <Text>Error</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favorites" />

      <NotesList
        viewModel={viewModel.notes}
        deleteNote={handleDeleteNote}
        refresh={() => viewModel.refresh()}
        setfavoritesNote={handleSetFavorite}
      />

      <StatusBar translucent style="dark" backgroundColor={Colors.claro} />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.claro,
  },
});

export default Favorites;
