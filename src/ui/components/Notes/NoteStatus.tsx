// Librerias
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes
import { TimeSince } from "@/ui/utils/TimeSince";
import { TranslateHelper } from "@/ui/i18n";

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
            {lastSynced
              ? `${TimeSince(lastSynced)}  •  `
              : lastUpdate && `${TimeSince(lastUpdate)}  •  `}
          </Text>
        </>
      )}

      <Text style={styles.statusTexts}>
        {isSyncing === true
          ? TranslateHelper("messages.notes.sync.synchronizing")
          : TranslateHelper("messages.notes.sync.synced")}
      </Text>

      {syncError && <Text style={styles.statusError}>{syncError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    paddingVertical: Spacings.space,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  statusTexts: {
    ...Fonts.bodyText,
    textTransform: "capitalize",
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
