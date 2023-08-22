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

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Fonts from "@/ui/styles/Fonts";
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
  // States
  const [heightTitle, setHeightTitle] = useState(40); // valor inicial para la altura

  // hooks

  // Funciones
  const noteId = route.params.id;
  const { note } = NotesDetailsViewModel(noteId);

  // Renders
  if (!note) return <Text>Loading...</Text>;

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <TextInput
        multiline
        inputMode="text"
        placeholder="Title"
        scrollEnabled={false}
        keyboardType="default"
        textBreakStrategy="simple"
        defaultValue={note.title}
        cursorColor={Colors.oscuro}
        lineBreakStrategyIOS="standard"
        style={[styles.input, styles.inputTitle]}
      />

      <TextInput
        multiline
        inputMode="text"
        autoFocus={!note.content ? true : false}
        placeholder="Content"
        scrollEnabled={false}
        keyboardType="default"
        textBreakStrategy="simple"
        defaultValue={note.content}
        cursorColor={Colors.oscuro}
        lineBreakStrategyIOS="standard"
        style={[styles.input, styles.inputContent]}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.spacex2,
    flex: 1,
  },

  input: {
    flex: 1,
    flexWrap: "wrap",
    ...Fonts.inputsBold,
  },

  inputTitle: {
    marginTop: Spacings.spacex2,
    ...Fonts.inputsBold,
  },

  inputContent: {
    marginBottom: Spacings.spacex5,
    ...Fonts.inputsNormal,
  },
});

export default NotesDetails;
