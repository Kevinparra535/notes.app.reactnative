// Librerias
import React from "react";
import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Fonts from "@/ui/styles/Fonts";
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta es una descripción más detallada del componente. Puedes hablar sobre su funcionamiento, cómo se utiliza, etc.
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

const PickAvatar = (): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones
  const blurhash = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

  // UseEffects

  // Renders
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pick your avatar</Text>
      <Text style={styles.subTitle}>
        Choose from our fun and unique collection of illustrations
      </Text>

      <View style={{ flex: 1 }}>
        <PagerView style={styles.viewPager} initialPage={0}>
          <View style={styles.page} key="1">
            <Image
              contentFit="cover"
              transition={200}
              style={styles.image}
              placeholder={blurhash}
              source={require("@/ui/assets/images/static/avatar1.png")}
            />
            <Text>Swipe ➡️</Text>
          </View>
          <View style={styles.page} key="2">
            <Image
              contentFit="cover"
              transition={200}
              style={styles.image}
              placeholder={blurhash}
              source={require("@/ui/assets/images/static/avatar2.png")}
            />
            <Text>Swipe ➡️</Text>
          </View>
          <View style={styles.page} key="3">
            <Image
              contentFit="cover"
              transition={200}
              style={styles.image}
              placeholder={blurhash}
              source={require("@/ui/assets/images/static/avatar3.png")}
            />
            <Text>Swipe ➡️</Text>
          </View>

          <View style={styles.page} key="4">
            <Image
              contentFit="cover"
              transition={200}
              style={styles.image}
              placeholder={blurhash}
              source={require("@/ui/assets/images/static/avatar4.png")}
            />
            <Text>Swipe ➡️</Text>
          </View>
        </PagerView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacings.spacex3,
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Colors.claro,
  },

  title: {
    textAlign: "center",
    ...Fonts.header1,
    fontSize: 30,
    lineHeight: 35,
  },

  subTitle: {
    marginVertical: Spacings.spacex2,
    textAlign: "center",
    ...Fonts.header4,
    fontSize: 16,
    lineHeight: 18,
    color: Colors.variants.one,
  },

  buttons: {
    padding: Spacings.space,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacings.space,
    width: "100%",
    borderRadius: Spacings.spacehalf,
    borderWidth: 1,
  },

  buttonsLabel: {
    ...Fonts.callToActions,
    fontSize: 14,
  },

  links: {
    marginTop: Spacings.space,
    textDecorationLine: "underline",
    ...Fonts.callToActions,
    fontSize: 13,
    color: Colors.bg.oscuro,
  },

  viewPager: {
    flex: 1,
    borderWidth: 1,
  },

  page: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default PickAvatar;
