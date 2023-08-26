// Librerias
import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
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

  // hooks
  const isFocused = useIsFocused();

  // Funciones
  const handleTextChange = (id: string, value: string) => {
    viewModel.handleNoteChange({ [id]: value });
  };

  useEffect(() => {
    if (isFocused) navigation.setParams({ hideTabBar: true });
  }, [isFocused, navigation]);

  // Renders
  if (viewModel.isLoading) return <Loader />;
  if (viewModel.error) return <Text>Error</Text>;

  return (
    <HeaderNotesDetails
      showLastTimeEdited
      isSyncing={viewModel.isSyncing}
      syncError={viewModel.syncError}
      lastSynced={viewModel.lastSynced}
      lastUpdate={viewModel.note?.updatedAt}
    >
      <KeyboardAwareScrollView
        style={styles.container}
        extraHeight={100}
        extraScrollHeight={100}
        enableOnAndroid
        viewIsInsideTabBar
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
