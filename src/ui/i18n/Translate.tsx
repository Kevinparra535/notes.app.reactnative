// Librerias
import React from "react";
import { Text } from "react-native";
import i18n from "./config";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos

// Tipado
type Props = {
  langkey: string;
  style?: Record<string, unknown> | Array<Record<string, unknown>>;
};

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

const Translate = ({ langkey, style }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return <Text style={style}>{i18n.t(langkey)}</Text>;
};

export default Translate;
