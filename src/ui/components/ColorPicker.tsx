// Librerias
import React from "react";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import ColorPicker, { Swatches } from "reanimated-color-picker";

// Contextos

// Hooks

// Screens

// Componentes
import Spacings from "@/ui/styles/Spacings";
import { COLORS_PICKER } from "@/ui/constants/Colors.type";
import { CategoriesViewModel } from "../screens/Categories/viewModel";

// Navigations

// Imagenes

// Estilos

// Tipado
type Props = {
  viewModel: CategoriesViewModel;
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

const ColorsPicker = observer(({ viewModel }: Props) => {
  // Estados

  // Contextos

  // Hooks

  // Funciones
  const onSelectColor = ({ hex }: { hex: string }) => {
    viewModel.setColor(hex);
  };

  // UseEffects

  // Renders
  return (
    <ColorPicker
      style={styles.container}
      onComplete={onSelectColor}
      value={viewModel.colorSelected}
    >
      <Swatches colors={COLORS_PICKER} swatchStyle={styles.spot} />
    </ColorPicker>
  );
});

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
