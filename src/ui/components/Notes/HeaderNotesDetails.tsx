// Librerias
import React, { MutableRefObject, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  children: JSX.Element;
  showLastTimeEdited?: boolean;
  isSyncing: boolean | undefined;
  lastSynced: FirebaseDate | null;
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
  children,
  isSyncing,
  syncError,
  lastSynced,
  lastUpdate,
  showLastTimeEdited,
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
      <View style={styles.header}>
        <Pressable onPress={handleBackPress}>
          <AntDesign name="arrowleft" size={24} color={Colors.oscuro} />
        </Pressable>

        <View style={styles.status}>
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

        <Pressable onPress={() => null}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color={Colors.oscuro}
          />
        </Pressable>
      </View>
      {children}
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  statusTexts: {
    ...Fonts.bodyText,
    fontSize: 12,
    color: Colors.variants.one,
  },

  statusError: {
    ...Fonts.bodyText,
    fontSize: 12,
    color: Colors.alerts.error,
  },
});

export default HeaderNotesDetails;
