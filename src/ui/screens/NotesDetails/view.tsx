// Librerias
import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, StyleSheet, Button } from "react-native";
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
import { observer } from "mobx-react-lite";

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

const NotesDetails: React.FC<Props> = observer(({ route }) => {
  // Configs
  const noteId = route.params.id;

  // Estados
  const [viewModel] = useState(() => new NotesDetailsViewModel(noteId));

  // Funciones
  const handleTextChange = (id: string, value: string) => {
    viewModel.handleNoteChange({ [id]: value });
  };

  console.log(viewModel.note);

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
        isSyncing={viewModel.isSyncing}
        syncError={viewModel.syncError}
        lastUpdate={viewModel.note?.updated}
      />
      <TitleInput
        value={viewModel.note?.title}
        onChangeText={handleTextChange}
      />
      <ContentInput
        value={viewModel.note?.content}
        onChangeText={handleTextChange}
      />
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.spacex2,
    flex: 1,
  },
});

export default NotesDetails;
