// Librerias
import React from "react";
import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  items: Array<string>;
  handleScroll: (e: any) => void;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta es una descripción más detallada del componente. Puedes hablar sobre su funcionamiento, cómo se utiliza, etc.
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <ImageSlider />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

const ImageSlider = ({ handleScroll, items }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <PagerView
      initialPage={0}
      style={styles.viewPager}
      onPageSelected={handleScroll}
    >
      {items.map((item, index) => (
        <View style={styles.page} key={String(index)}>
          <Image
            source={item}
            transition={200}
            contentFit="cover"
            style={styles.image}
            placeholder={blurhash}
          />
          <Text>Swipe ➡️</Text>
        </View>
      ))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    marginBottom: Spacings.spacex3,
    flex: 1,
    width: "100%",
  },

  page: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default ImageSlider;
