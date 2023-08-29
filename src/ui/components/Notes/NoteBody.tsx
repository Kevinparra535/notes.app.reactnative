// Librerias
import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Contextos

// Hooks

// Screens

// Componentes
import TitleInput from "@/ui/components/Notes/TitleInput";
import ContentInput from "../../components/Notes/ContentInput";

// Navigations

// Imagenes

// Estilos
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  color: string | undefined;
  title: string | undefined;
  content: string | undefined;
  onChangeText: (id: string, value: string) => void;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de mostrar el cuerpo de nuestra nota
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 *  <NoteBody color={viewModel.note?.color} title={viewModel.note?.title} onChangeText={handleTextChange} content={viewModel.note?.content />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const NoteBody = ({
  color,
  title,
  content,
  onChangeText,
}: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraHeight={100}
      viewIsInsideTabBar
      extraScrollHeight={100}
      style={[styles.container, { backgroundColor: color }]}
    >
      <TitleInput value={title} onChangeText={onChangeText} />
      <ContentInput value={content} onChangeText={onChangeText} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.spacex2,
    flex: 1,
  },
});

export default NoteBody;
