// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import i18n from "./config";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos

// Tipado
type Props ={
  langkey: string
}

/**
 * Descripción del componente.
 *
 * @remarks
 * Componente para traducir de manera facil los textos de la ui
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <Translate langKey='text' />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Translate = ({langkey}: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <Text>{i18n.t(langkey)}</Text>
  );
};


const styles = StyleSheet.create({});

export default Translate;
