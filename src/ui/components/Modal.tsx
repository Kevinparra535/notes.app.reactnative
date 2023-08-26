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
  children: JSX.Element;
  visible: boolean;
  onRequestClose: () => void;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este modal se usa como componente compartido
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <Modal visible={visible} onRequestClose={() => func(boolean)}><AnyElement/></Modal>
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Modal = ({ children, visible, onRequestClose }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      {children}
    </Modal>
  );
};

Modal.defaultProps = {};

const styles = StyleSheet.create({});

export default Modal;
