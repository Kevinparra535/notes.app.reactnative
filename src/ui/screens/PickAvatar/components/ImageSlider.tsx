// Librerias
import React from "react";
import { Image } from "expo-image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { View, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Spacings from "@/ui/styles/Spacings";
import Colors from "@/ui/styles/Colors";

// Tipado
type Props = {
  items: Array<string>;
  page: number;
  handleScroll: (e: any) => void;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de crear un carousel para seleccionar el avatar, este avatar es es el que se almacenara en la base de datos
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

const ImageSlider = ({ handleScroll, page, items }: Props): JSX.Element => {
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
          <ChevronLeftIcon
            size={24}
            color={page !== 0 ? Colors.oscuro : Colors.variants.one}
          />

          <Image
            source={item}
            transition={200}
            contentFit="cover"
            style={styles.image}
            placeholder={blurhash}
          />

          <ChevronRightIcon
            size={24}
            color={page !== 8 ? Colors.oscuro : Colors.variants.one}
          />
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
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default ImageSlider;
