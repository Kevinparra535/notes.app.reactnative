// Librerias
import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { observer } from "mobx-react-lite";

// Contextos

// Hooks

// Screens

// Componentes
import { CreateNotesViewModel } from "./viewModel";
import NoteBody from "@/ui/components/Notes/NoteBody";
import NoteHeader from "@/ui/components/Notes/NoteHeader";

// Navigations

// Imagenes

// Estilos
import Spacings from "@/ui/styles/Spacings";
import { useFocusEffect } from "@react-navigation/native";
import ModalColorPicker from "@/ui/components/ModalColorPicker";
import RootStoreContext from "@/ui/context/RootStoreContext";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta view muestra todo el apartado grafico para crear una nota
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <view />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const CreateNotes: React.FC = observer(() => {
  const auth = useContext(RootStoreContext);

  const userId = auth?.authStore.user?.uid || "";

  // Estados
  const [viewModel] = useState(() => new CreateNotesViewModel(userId));
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Contextos

  // hooks

  // Funciones
  const handleTextChange = (id: string, value: string) => {
    viewModel.handleNoteChange({ [id]: value });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        viewModel.saveAndCreateNewNote();
      };
    }, [])
  );

  // Renders
  return (
    <NoteHeader
      mode="create"
      showLastTimeEdited
      viewModel={viewModel}
      color={viewModel.newNoteContent.color}
      setModalIsVisible={() => setModalIsVisible(!modalIsVisible)}
    >
      <>
        <NoteBody
          color={viewModel.newNoteContent.color}
          title={viewModel.note?.title}
          onChangeText={handleTextChange}
          content={viewModel.note?.content}
        />

        <ModalColorPicker
          visible={modalIsVisible}
          onColorChange={handleTextChange}
          onRequestClose={() => setModalIsVisible(!modalIsVisible)}
        />
      </>
    </NoteHeader>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.spacex2,
    flex: 1,
  },
});

export default CreateNotes;
