// Librerias
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { observer } from "mobx-react-lite";

// Contextos

// Hooks

// ViewModels
import { NotesDetailsViewModel } from "./viewModel";

// Screens

// Componentes
import TitleInput from "@/ui/components/Notes/TitleInput";
import Loader from "@/ui/components/Loader";
import ContentInput from "../../components/Notes/ContentInput";
import HeaderNotesDetails from "@/ui/components/Notes/HeaderNotesDetails";
import ModalColorPicker from "./components/ModalColorPicker";

// Navigations

// Imagenes

// Estilos
import Spacings from "@/ui/styles/Spacings";
import { useIsFocused } from "@react-navigation/native";

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
    <HeaderNotesDetails
      mode="edit"
      showLastTimeEdited
      color={viewModel.note?.color}
      deleteNotes={handleDeleteNote}
      isSyncing={viewModel.isSyncing}
      syncError={viewModel.syncError}
      isFavorite={viewModel.note?.pin}
      lastSynced={viewModel.lastSynced}
      setFavouritesNote={handleSetFavorite}
      lastUpdate={viewModel.note?.updatedAt}
      setModalIsVisible={() => setModalIsVisible(!modalIsVisible)}
    >
      <>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraHeight={100}
          viewIsInsideTabBar
          extraScrollHeight={100}
          style={[styles.container, { backgroundColor: viewModel.note?.color }]}
        >
          <TitleInput
            value={viewModel.note?.title}
            onChangeText={handleTextChange}
          />
          <ContentInput
            value={viewModel.note?.content}
            onChangeText={handleTextChange}
          />
        </KeyboardAwareScrollView>

        <ModalColorPicker
          visible={modalIsVisible}
          onColorChange={handleSetColor}
          onRequestClose={() => setModalIsVisible(!modalIsVisible)}
        />
      </>
    </HeaderNotesDetails>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.spacex2,
    flex: 1,
  },
});

export default NotesDetails;
