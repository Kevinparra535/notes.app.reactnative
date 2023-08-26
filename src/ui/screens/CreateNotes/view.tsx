// Librerias
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { observer } from "mobx-react-lite";

// Contextos

// Hooks

// Screens

// Componentes
import ContentInput from "@/ui/components/Notes/ContentInput";
import HeaderNotesDetails from "@/ui/components/Notes/HeaderNotesDetails";
import TitleInput from "@/ui/components/Notes/TitleInput";
import { CreateNotesViewModel } from "./viewModel";

// Navigations

// Imagenes

// Estilos
import Spacings from "@/ui/styles/Spacings";
import { useFocusEffect } from "@react-navigation/native";

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
  const userId = "test-id";

  // Estados
  const [viewModel] = useState(() => new CreateNotesViewModel(userId));

  // Contextos

  // hooks
  const isNeedUpdate: MutableRefObject<boolean> = useRef(false);

  // Funciones
  const handleTextChange = (id: string, value: string) => {
    viewModel.handleNoteChange({ [id]: value });
    isNeedUpdate.current = true;
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        isNeedUpdate.current = false;
        viewModel.saveAndCreateNewNote();
        console.log("unmount");
      };
    }, [])
  );

  // Renders
  return (
    <HeaderNotesDetails
      isNeedUpdate={isNeedUpdate}
      isSyncing={viewModel.isSyncing}
      syncError={viewModel.syncError}
      lastUpdate={viewModel.note?.updatedAt}
    >
      <KeyboardAwareScrollView
        style={styles.container}
        extraHeight={100}
        extraScrollHeight={100}
        enableOnAndroid
        viewIsInsideTabBar
      >
        <TitleInput onChangeText={handleTextChange} />
        <ContentInput onChangeText={handleTextChange} />
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

export default CreateNotes;
