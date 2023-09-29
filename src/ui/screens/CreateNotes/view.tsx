// Librerias
import React, { useCallback, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { useFocusEffect } from "@react-navigation/native";

// Contextos
import RootStoreContext from "@/ui/context/RootStoreContext";

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
    >
      <>
        <NoteBody
          color={viewModel.newNoteContent.color}
          title={viewModel.note?.title}
          onChangeText={handleTextChange}
          content={viewModel.note?.content}
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
