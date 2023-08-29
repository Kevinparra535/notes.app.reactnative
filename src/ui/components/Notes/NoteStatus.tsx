// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  color: string | undefined;
  showLastTimeEdited?: boolean;
  isSyncing: boolean | undefined;
  lastSynced?: FirebaseDate | null;
  lastUpdate: FirebaseDate | undefined;
  syncError: string | boolean | null | undefined;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente muestra fecha y estado al momento de sincronizar la app
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <NoteStatus
      showLastTimeEdited
      color={viewModel.note?.color}
      isSyncing={viewModel.isSyncing}
      syncError={viewModel.syncError}
      lastSynced={viewModel.lastSynced}
      lastUpdate={viewModel.note?.updatedAt}
    />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const NoteStatus = ({
  color,
  isSyncing,
  syncError,
  lastSynced,
  lastUpdate,
  showLastTimeEdited,
}: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
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
  );
};

NoteStatus.defaultProps = {};

const styles = StyleSheet.create({
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
});

export default NoteStatus;
