// Librerias
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Contextos

// Hooks

// Componentes

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";
import Fonts from "@/ui/styles/Fonts";

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente renderiza una card en la vista inicial de las notas
 *
 * @example
 * Ejemplo de uso:
 * <NotesCards />
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

type Props = { title: string; content: string };

const NotesCards = ({ title, content }: Props) => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.content} numberOfLines={4}>
          {content}
        </Text>
      </View>

      <View style={styles.cardFooter}>{/* <Text>Tags</Text> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: Spacings.spacex2,
    paddingHorizontal: Spacings.space + 5 ,
    marginTop: Spacings.space,
    marginHorizontal: Spacings.space,
    borderColor: Colors.variants.one,
    shadowColor: Colors.oscuro,
    borderRadius: Spacings.space,
    borderWidth: 1,
    borderBlockColor: Colors.variants.one,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: Colors.claro,
  },

  cardHeader: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: Spacings.space,
  },

  title: {
    maxWidth: "90%",
    overflow: "hidden",
    ...Fonts.header1,
    fontSize: 22,
    lineHeight: Spacings.spacex3,
  },

  cardBody: {
    minHeight: 70,
  },

  content: {
    ...Fonts.bodyText,
    fontSize: 13,
  },

  cardFooter: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default NotesCards;
