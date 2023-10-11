// Librerias
import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Contextos

// Hooks

// Componentes
import Category from "@/domain/entities/Category";

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

type Props = {
  title: string;
  content: string;
  uuid: string;
  color: string;
  tags?: Array<Category>;
};

const NotesCards = ({ title, content, uuid, color, tags }: Props) => {
  // Estados

  // Contextos

  // Hooks
  const navigation: any = useNavigation();

  // Funciones
  const handlePress = () => {
    navigation.navigate("NotesDetails", { id: uuid });
  };

  const TagsCard = ({ title, color }: { title: string; color: string }) => {
    return (
      <View style={[styles.tags, { backgroundColor: color }]}>
        <Text style={styles.tagsText}>{title}</Text>
      </View>
    );
  };

  // UseEffects

  // Renders
  return (
    <Pressable
      onPress={handlePress}
      style={[styles.card, { backgroundColor: color }]}
    >
      {title !== null && (
        <View style={styles.cardHeader}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      )}

      {content !== null && (
        <View style={styles.cardBody}>
          <Text style={styles.content} numberOfLines={3}>
            {content}
          </Text>
        </View>
      )}

      {!title && !content && (
        <View style={styles.cardEmpty}>
          <Text style={styles.emptyTitle}>Empty Note</Text>
        </View>
      )}

      <FlatList
        horizontal
        data={tags}
        scrollEnabled={false}
        style={styles.cardFooter}
        ListEmptyComponent={<View />}
        keyExtractor={(item) => item.uuid}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TagsCard title={item.title} color={item.color} />
        )}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: Spacings.space,
    paddingHorizontal: Spacings.space,
    margin: Spacings.space,
    minHeight: 70,
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
    paddingTop: Spacings.spacehalf,
    flex: 1,
    flexDirection: "row-reverse",
  },

  tags: {
    paddingVertical: Spacings.spacehalf,
    paddingHorizontal: Spacings.space,
    borderRadius: Spacings.spacehalf,
    marginLeft: Spacings.spacehalf,
    backgroundColor: Colors.variants.one,
  },

  tagsText: {
    ...Fonts.bodyText,
    fontSize: 12,
  },
});

export default NotesCards;
