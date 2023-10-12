// Librerias
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes
import { TranslateHelper } from "@/ui/i18n";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Fonts from "@/ui/styles/Fonts";
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  value?: string | undefined;
  onChangeText(id: string, value: string): void;
};

/**
 * Descripción del componente.
 *
 * @remarks
 *  * Este componente se encarga de setear y mostrar el contenido al momento de abrirse la nota, a futuro se puede ajustar para que sea reutilizable pero por ahora es independiente.
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <TitleInput />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const ContentInput = ({ value, onChangeText }: Props): JSX.Element => {
  // Estados
  const [height, setHeight] = useState(50);

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <TextInput
      multiline
      inputMode="text"
      style={[styles.input, { height: Math.max(35, height) }]}
      defaultValue={value}
      scrollEnabled={false}
      keyboardType="default"
      textBreakStrategy="simple"
      cursorColor={Colors.oscuro}
      lineBreakStrategyIOS="standard"
      autoFocus={!value ? true : false}
      placeholder={TranslateHelper("input.content")}
      onChangeText={(value) => onChangeText("content", value)}
      onContentSizeChange={(e) => setHeight(e.nativeEvent.contentSize.height)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexWrap: "wrap",
    minHeight: 50,
    ...Fonts.inputsNormal,
  },
});

export default ContentInput;
