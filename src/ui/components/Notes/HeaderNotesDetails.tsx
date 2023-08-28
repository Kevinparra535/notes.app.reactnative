// Librerias
import React, { MutableRefObject, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  FolderArrowDownIcon,
  RectangleStackIcon,
  StarIcon,
  SwatchIcon,
  TagIcon,
  TrashIcon,
} from "react-native-heroicons/outline";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// Contextos

// Hooks

// Screens

// Componentes
import { TimeSince } from "@/ui/utils/TimeSince";

// Navigations

// Imagenes

// Estilos
import Fonts from "@/ui/styles/Fonts";
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado

type FirebaseDate = { seconds: number; nanoseconds: number };

type Props = {
  mode: string;
  color?: string;
  isFavorite?: boolean;
  children: JSX.Element;
  deleteNotes?: () => void;
  showLastTimeEdited?: boolean;
  setModalIsVisible: () => void;
  setFavouritesNote?: () => void;
  isSyncing: boolean | undefined;
  lastSynced?: FirebaseDate | null;
  lastUpdate: FirebaseDate | undefined;
  syncError: string | boolean | null | undefined;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente funciona como header personalizado y extiende funcionamientos del header global
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <HeaderNotesDetails />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const HeaderNotesDetails = ({
  mode,
  color,
  children,
  isSyncing,
  syncError,
  isFavorite,
  lastSynced,
  lastUpdate,
  deleteNotes,
  setFavouritesNote,
  showLastTimeEdited,
  setModalIsVisible,
}: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();

  // Funciones
  const handleBackPress = () => {
    navigation.navigate({
      name: "Notes",
      merge: true,
    });
  };

  // UseEffects

  // Renders
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <Pressable onPress={handleBackPress}>
          <ArrowLeftIcon size={24} color={Colors.oscuro} />
        </Pressable>

        <View style={{ flexDirection: "row" }}>
          <Pressable style={styles.actions} onPress={setModalIsVisible}>
            <SwatchIcon size={24} color={Colors.oscuro} />
          </Pressable>

          {mode === "edit" && (
            <Pressable style={styles.actions} onPress={() => null}>
              <FolderArrowDownIcon size={24} color={Colors.oscuro} />
            </Pressable>
          )}

          <Pressable style={styles.actions} onPress={() => null}>
            <RectangleStackIcon size={24} color={Colors.oscuro} />
          </Pressable>

          <Pressable style={styles.actions} onPress={setFavouritesNote}>
            <StarIcon
              size={24}
              color={Colors.oscuro}
              fill={isFavorite ? Colors.variants.three : "transparent"}
            />
          </Pressable>

          {mode === "edit" && (
            <Pressable style={styles.actions} onPress={deleteNotes}>
              <TrashIcon size={24} color={Colors.oscuro} />
            </Pressable>
          )}
        </View>
      </View>

      {children}

      <View style={[styles.status, { backgroundColor: color }]}>
        {showLastTimeEdited && (
          <>
            <Text style={styles.statusTexts}>
              Edited:{" "}
              {lastSynced
                ? TimeSince(lastSynced)
                : lastUpdate && TimeSince(lastUpdate)}
            </Text>
            <Text style={styles.statusTexts}> • </Text>
          </>
        )}

        <Text style={styles.statusTexts}>
          {isSyncing ? "Synchronizing..." : "Synced"}
        </Text>

        {syncError && <Text style={styles.statusError}>{syncError}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: Spacings.space,
    paddingHorizontal: Spacings.spacex2,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  status: {
    paddingVertical: Spacings.space,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  statusTexts: {
    ...Fonts.bodyText,
    fontSize: 12,
    color: Colors.oscuro,
  },

  statusError: {
    ...Fonts.bodyText,
    fontSize: 12,
    color: Colors.alerts.error,
  },

  actions: {
    marginLeft: Spacings.space,
  },
});

export default HeaderNotesDetails;
