// Librerias
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

type Props = { title: string; content: string; uuid: string };

const NotesCards = ({ title, content, uuid }: Props) => {
  // Estados

  // Contextos

  // Hooks
  const navigation: any = useNavigation();

  // Funciones
  const handlePress = () => {
    navigation.navigate("NotesDetails", { id: uuid });
  };

  // UseEffects

  // Renders
  return (
    <Pressable onPress={handlePress} style={styles.card}>
      {title && (
        <View style={styles.cardHeader}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      )}

      {content && (
        <View style={styles.cardBody}>
          <Text style={styles.content} numberOfLines={4}>
            {content}
          </Text>
        </View>
      )}

      {!title && !content && (
        <View style={styles.cardEmpty}>
          <Text style={styles.emptyTitle}>Empty Note</Text>
        </View>
      )}

      <View style={styles.cardFooter}>{/* <Text>Tags</Text> */}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: Spacings.space,
    paddingHorizontal: Spacings.space,
    margin: Spacings.space,
    borderColor: Colors.variants.one,
    shadowColor: Colors.oscuro,
    borderRadius: Spacings.spacehalf,
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
  },

  title: {
    maxWidth: "90%",
    overflow: "hidden",
    ...Fonts.header1,
    fontSize: 15,
    lineHeight: 20,
  },

  cardBody: {
    marginTop: Spacings.spacehalf,
    minHeight: 20,
  },

  content: {
    ...Fonts.bodyText,
    fontSize: 13,
  },

  cardEmpty: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },

  emptyTitle: {
    ...Fonts.header1,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.variants.one,
  },

  cardFooter: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default NotesCards;
