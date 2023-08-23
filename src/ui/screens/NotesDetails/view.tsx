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

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Fonts from "@/ui/styles/Fonts";
import Spacings from "@/ui/styles/Spacings";
import ContentInput from "./components/ContentInput";

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
  // Funciones
  const noteId = route.params.id;
  const { note } = NotesDetailsViewModel(noteId);


  // Renders
  if (!note) return <Loader />;

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      extraHeight={100}
      extraScrollHeight={100}
      enableOnAndroid
      viewIsInsideTabBar
    >
      <TitleInput value={note.title} />
      <ContentInput value={note.content} />
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
