// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos

// Tipado
type Props = {
  isSyncing: boolean | undefined;
  syncError: string | boolean | null | undefined;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente le informa al usuario que se estan sincronizando sus cambios mientras esta escribiendo o si se ha generado un error y no se ha podido guardar
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <StatusUpdating />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const StatusUpdating = ({ isSyncing, syncError }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <>
      {isSyncing && <Text style={{ color: "black" }}>Synchronizing...</Text>}
      {syncError && <Text style={{ color: "red" }}>{syncError}</Text>}
    </>
  );
};

StatusUpdating.defaultProps = {};

const styles = StyleSheet.create({});

export default StatusUpdating;
