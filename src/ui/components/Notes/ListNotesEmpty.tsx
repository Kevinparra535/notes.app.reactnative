// Librerias
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Fonts from "@/ui/styles/Fonts";
import Spacings from "@/ui/styles/Spacings";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se renderiza en las listas de las notas (por ahora) cuando no hay items que mostrar
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <ListNotesEmpty />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const ListNotesEmpty = (): JSX.Element => {
  // Estados
  const [randomImage, setRandomImage] = useState<ImageSourcePropType | null>(
    null
  );

  // Contextos

  // Hooks

  // Funciones
  const images: Array<ImageSourcePropType> = [
    require("../../assets/images/peeps/peep-2.png"),
    require("../../assets/images/peeps/peep-5.png"),
    require("../../assets/images/peeps/peep-7.png"),
    require("../../assets/images/peeps/peep-8.png"),
    require("../../assets/images/peeps/peep-17.png"),
    require("../../assets/images/peeps/peep-18.png"),
  ];

  // UseEffects
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  // Renders
  return (
    <SafeAreaView style={styles.container}>
      {randomImage && (
        <Image
          style={styles.image}
          resizeMethod="resize"
          resizeMode="contain"
          source={randomImage!}
        />
      )}

      <Text style={styles.title}>No hay nada para mostrar</Text>
      <Text style={styles.subtitle}>Creemos nuetra primera nota</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height: 450,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  image: {
    width: 200,
    height: 200,
    opacity: 0.7
  },

  title: {
    ...Fonts.header4,
    fontSize: 18,
    color: Colors.brand.secondary,
  },

  subtitle: {
    ...Fonts.bodyText,
    color: Colors.brand.secondary,
  },
});

export default ListNotesEmpty;
