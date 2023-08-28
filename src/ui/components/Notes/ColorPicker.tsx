// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";

// Contextos

// Hooks

// Screens

// Componentes
import { COLORS_PICKER } from "@/ui/constants/Colors.type";
import Spacings from "@/ui/styles/Spacings";

// Navigations

// Imagenes

// Estilos

// Tipado
type Props = {
  actualColor: string;
  onColorChange: (id: string, value: string) => void;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de mostrar una cantidad x de colores para que el usuario pueda seleccionarlos
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <ColorsPicker />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const ColorsPicker = ({ actualColor, onColorChange }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones
  const onSelectColor = ({ hex }: { hex: string }) => {
    onColorChange("color", hex);
  };

  // UseEffects

  // Renders
  return (
    <ColorPicker
      value={actualColor}
      style={styles.container}
      onComplete={onSelectColor}
    >
      <Swatches colors={COLORS_PICKER} swatchStyle={styles.spot} />
    </ColorPicker>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacings.spacex2,
    width: "100%",
  },

  spot: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 100,
  },
});

export default ColorsPicker;
