// Librerias
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useIsFocused } from "@react-navigation/native";

// Contextos

// Hooks

// ViewModels
import { NotesDetailsViewModel } from "./viewModel";
import NoteBody from "@/ui/components/Notes/NoteBody";

// Screens

// Componentes
import Loader from "@/ui/components/Loader";
import NoteHeader from "@/ui/components/Notes/NoteHeader";
import ModalColorPicker from "./components/ModalColorPicker";

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
 * Esta pantalla solo muestra una nota en base a los parametros
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <NotesDetailsScreen />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const NotesDetails: React.FC<Props> = observer(({ route, navigation }) => {
  // Configs
  const noteId = route.params.id;

  // Estados
  const [viewModel] = useState(() => new NotesDetailsViewModel(noteId));
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // hooks
  const isFocused = useIsFocused();

  // Funciones
  const handleTextChange = (id: string, value: string) => {
    viewModel.handleNoteChange({ [id]: value });
  };

  const handleDeleteNote = async () => {
    Alert.alert(
      "Are you sure?",
      "If you delete this note you will not be able to recover it.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const result = await viewModel.deleteNotes();
            if (result) navigation.goBack();
          },
        },
      ]
    );
  };

  const handleSetFavorite = () => {
    viewModel.setFavouritesNote({ pin: !viewModel.note?.pin });
  };

  const handleSetColor = (id: string, value: string) => {
    viewModel.setNewColorNote({ [id]: value });
  };

  useEffect(() => {
    console.log(viewModel.note);
  }, [viewModel.note]);

  useEffect(() => {
    if (isFocused) navigation.setParams({ hideTabBar: true });
  }, [isFocused, navigation]);

  // Renders
  if (viewModel.isLoading) return <Loader />;
  if (viewModel.error) return <Text>Error</Text>;

  return (
    <NoteHeader
      mode="edit"
      showLastTimeEdited
      viewModel={viewModel}
      deleteNotes={handleDeleteNote}
      setFavouritesNote={handleSetFavorite}
      setModalIsVisible={() => setModalIsVisible(!modalIsVisible)}
    >
      <>
        <NoteBody
          color={viewModel.note?.color}
          title={viewModel.note?.title}
          onChangeText={handleTextChange}
          content={viewModel.note?.content}
        />

        <ModalColorPicker
          visible={modalIsVisible}
          onColorChange={handleSetColor}
          onRequestClose={() => setModalIsVisible(!modalIsVisible)}
        />
      </>
    </NoteHeader>
  );
});

const styles = StyleSheet.create({});

export default NotesDetails;
