// Librerias
import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Fonts from "@/ui/styles/Fonts";
import Spacings from "@/ui/styles/Spacings";
import { observer } from "mobx-react-lite";
import { CategoriesViewModel } from "@/ui/screens/Categories/viewModel";

// Tipado
type Props = {
  uuid: string;
  title: string;
  color: string;
  viewModel: CategoriesViewModel;
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
 * <CategoriesCards />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const CategoriesCards: React.FC<Props> = observer(
  ({ uuid, title, color, viewModel }) => {
    // Estados

    // Contextos

    // Hooks

    // Funciones
    const handleEdit = (id: string) => {
      viewModel.setCategoryId(id);
      viewModel.setShowCatInput(false)
    };

    const handleClose = () => {
      viewModel.setCategoryId(null);
    };

    // UseEffects

    // Renders
    return (
      <View
        style={[
          styles.container,
          { borderWidth: viewModel.categoryIdToEdit === uuid ? 1 : 0 },
        ]}
      >
        {viewModel.categoryIdToEdit === uuid ? (
          <>
            <View style={styles.titleContainer}>
              <Pressable style={styles.action}>
                <TrashIcon size={24} color={Colors.alerts.error} />
              </Pressable>

              <View style={[styles.color, { backgroundColor: color }]}></View>

              <TextInput style={styles.input} autoFocus defaultValue={title} />
            </View>

            <View style={styles.actionsContainer}>
              <Pressable onPress={handleClose} style={styles.action}>
                <XMarkIcon size={24} color={Colors.alerts.error} />
              </Pressable>

              <Pressable>
                <CheckIcon size={24} color={Colors.alerts.check} />
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View style={styles.titleContainer}>
              <View style={[styles.color, { backgroundColor: color }]}></View>
              <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.actionsContainer}>
              <Pressable onPress={() => handleEdit(uuid)} style={styles.action}>
                <PencilSquareIcon size={24} color={Colors.oscuro} />
              </Pressable>
            </View>
          </>
        )}
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

export default CategoriesCards;
