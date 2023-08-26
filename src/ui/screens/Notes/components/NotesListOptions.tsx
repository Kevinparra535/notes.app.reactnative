// Librerias
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
} from "react-native";
import {
  EllipsisVerticalIcon,
  FolderArrowDownIcon,
  FolderIcon,
  StarIcon,
  SwatchIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";
import Modal from "@/ui/components/Modal";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se utiliza como footer para las cards
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <NotesFooter />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const NotesListOptions = (): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <View style={styles.container}>
      <View style={styles.containerGroups}>
        <Pressable style={styles.actions}>
          <StarIcon color={Colors.oscuro} size={20} />
        </Pressable>

        <Pressable style={styles.actions}>
          <SwatchIcon color={Colors.oscuro} size={20} />
        </Pressable>
      </View>

      <View style={styles.containerGroups}>
        <Pressable style={styles.actions}>
          <FolderArrowDownIcon color={Colors.oscuro} size={20} />
        </Pressable>

        <Pressable style={styles.actions}>
          <EllipsisVerticalIcon color={Colors.oscuro} size={20} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  containerGroups: {
    padding: Spacings.spacehalf,
    flexDirection: "row",
    width: 200,
    height: "100%",
  },

  actions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default NotesListOptions;
