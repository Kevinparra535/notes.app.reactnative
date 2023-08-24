// Librerias
import React, { useEffect, useState } from "react";
import { Text, TextInput, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Contextos

// Hooks

// ViewModels
import { NotesDetailsViewModel } from "./viewModel";

// Screens

// Componentes
import TitleInput from "./components/TitleInput";
import Loader from "@/ui/components/Loader";
import StatusUpdating from "./components/StatusUpdating";
import ContentInput from "./components/ContentInput";

// Navigations

// Imagenes

// Estilos
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  route: any;
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

const NotesDetails = ({ route }: Props): JSX.Element => {
  // Configs
  const noteId = route.params.id;
  const viewModel = NotesDetailsViewModel(noteId);

  // Estados
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  // Funciones
  const handleTextChange = (id: string, value: string) => {
    setInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    viewModel.handleNoteChange(inputs);
  }, [inputs]);

  useEffect(() => {
    if (viewModel.note) {
      setInputs({
        title: viewModel.note?.title,
        content: viewModel.note?.content,
      });
    }
  }, [viewModel.note]);

  // Renders
  if (viewModel.isLoading) return <Loader />;
  if (viewModel.error) return <Text>Error</Text>;

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      extraHeight={100}
      extraScrollHeight={100}
      enableOnAndroid
      viewIsInsideTabBar
    >
      <StatusUpdating
        isSyncing={viewModel.note?.isSyncing}
        syncError={viewModel.note?.syncError}
      />
      <TitleInput value={inputs.title} onChangeText={handleTextChange} />
      <ContentInput value={inputs.content} onChangeText={handleTextChange} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.spacex2,
    flex: 1,
  },
});

export default NotesDetails;
