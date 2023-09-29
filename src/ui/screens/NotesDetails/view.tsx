// Librerias
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useIsFocused } from "@react-navigation/native";
import { TranslateHelper } from "@/ui/i18n";

// Contextos

// Hooks

// ViewModels
import { NotesDetailsViewModel } from "./viewModel";
import NoteBody from "@/ui/components/Notes/NoteBody";

// Screens

// Componentes
import Loader from "@/ui/components/Loader";
import NoteHeader from "@/ui/components/Notes/NoteHeader";
import ModalColorPicker from "../../components/ModalColorPicker";

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
      TranslateHelper("alerts.notes.delete.title"),
      TranslateHelper("alerts.notes.delete.message"),
      [
        {
          style: "cancel",
          text: TranslateHelper("alerts.notes.delete.cancel"),
        },
        {
          text: TranslateHelper("alerts.notes.delete.delete"),
          onPress: async (): Promise<void> => {
            const result = await viewModel.deleteNotes();
            if (result) navigation.goBack();
          },
        },
      ]
    );
  };

  const handleSetFavorite = () => {
    viewModel.setfavoritesNote({ pin: !viewModel.note?.pin });
  };

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
      setfavoritesNote={handleSetFavorite}
    >
      <NoteBody
        color={viewModel.note?.color}
        title={viewModel.note?.title}
        onChangeText={handleTextChange}
        content={viewModel.note?.content}
      />
    </NoteHeader>
  );
});

const styles = StyleSheet.create({});

export default NotesDetails;
