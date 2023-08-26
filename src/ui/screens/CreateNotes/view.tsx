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

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta view muestra todo el apartado grafico para crear una nota
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <view />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const CreateNotes = (): JSX.Element => {
  // Estados
  const [data, setData] = useState([]);

  // Contextos

  // Hooks

  // Funciones

  // UseEffects
  useEffect(() => {}, []);

  // Renders
  return (
    <SafeAreaView>
      <View>
        <Text>Create note</Text>
      </View>
    </SafeAreaView>
  );
};

CreateNotes.defaultProps = {};

const styles = StyleSheet.create({});

export default CreateNotes;
