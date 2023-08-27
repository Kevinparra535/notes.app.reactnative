// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { StarIcon, TrashIcon } from "react-native-heroicons/outline";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  uuid: string;
  noteIsFavorite: boolean;
  deleteNote: (uuid: string) => void;
  setFavouritesNote: (uuid: string, pin: boolean) => void;
};

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

const NotesListOptions = ({
  uuid,
  deleteNote,
  noteIsFavorite,
  setFavouritesNote,
}: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  const handleDeleteNote = () => {
    Alert.alert(
      "Are you sure?",
      "If you delete this note you will not be able to recover it.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteNote(uuid) },
      ]
    );
  };

  // UseEffects

  // Renders
  return (
    <View style={styles.container}>
      <View style={styles.containerGroups}>
        <Pressable
          onPress={() => setFavouritesNote(uuid, !noteIsFavorite)}
          style={styles.actions}
        >
          <StarIcon
            color={Colors.variants.three}
            size={25}
            fill={noteIsFavorite ? Colors.variants.three : Colors.claro}
          />
        </Pressable>
      </View>

      <View style={styles.containerGroups}>
        {/* <Pressable style={styles.actions}>
          <FolderArrowDownIcon color={Colors.oscuro} size={25} />
        </Pressable> */}

        <Pressable onPress={handleDeleteNote} style={styles.actions}>
          <TrashIcon color={Colors.alerts.error} size={25} />
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
    width: 100,
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