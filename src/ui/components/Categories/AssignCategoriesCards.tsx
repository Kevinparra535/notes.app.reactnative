// Librerias
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

// Contextos

// Hooks

// Screens

// Componentes
import { AssignCategoriesViewModel } from "@/ui/screens/AssignCategories/viewModel";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Fonts from "@/ui/styles/Fonts";
import Spacings from "@/ui/styles/Spacings";
import { observer } from "mobx-react-lite";

// Tipado
type Props = {
  uuid: string;
  title: string;
  color: string;
  viewModel: AssignCategoriesViewModel;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente renderiza las cards de las categorias
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <AssignCategoriesCards />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const AssignCategoriesCards: React.FC<Props> = observer(
  ({ uuid, title, color, viewModel }) => {
    // Estados

    // Contextos

    // Hooks

    // Funciones
    const handleSelect = (id: string) => {
      viewModel.setCategory(id);
    };

    // UseEffects

    // Renders
    return (
      <View style={[styles.container]}>
        <View style={styles.titleContainer}>
          <View
            style={[
              styles.color,
              {
                backgroundColor: color,
              },
            ]}
          ></View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <Checkbox
            value={viewModel.categoriesSelected.includes(uuid)}
            onValueChange={() => handleSelect(uuid)}
            color={
              viewModel.categoriesSelected.includes(uuid)
                ? Colors.oscuro
                : undefined
            }
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: Spacings.space,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    height: 50,
    shadowColor: Colors.oscuro,
    borderRadius: Spacings.spacehalf,
  },

  titleContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },

  color: {
    marginRight: Spacings.spacex2,
    width: 24,
    height: 24,
    borderRadius: Spacings.spacehalf,
    backgroundColor: "black",
  },

  title: {
    flex: 1,
    ...Fonts.bodyText,
  },

  input: {
    flex: 1,
    ...Fonts.bodyText,
    lineHeight: 20,
  },

  actionsContainer: {
    flexDirection: "row",
  },

  action: {
    marginRight: Spacings.space,
  },
});

export default AssignCategoriesCards;
