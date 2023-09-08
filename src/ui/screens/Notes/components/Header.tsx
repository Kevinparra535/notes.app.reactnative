// Librerias
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
import RootStore from "@/ui/store/RootStore";

// Tipado
type Props = {
  children: any;
  user: typeof RootStore | null;
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
 * <Header />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Header = ({ children, user }: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks
  const insets = useSafeAreaInsets();

  // Funciones
  const blurhash = "U7KBRFj[?bIUIUt7?bIU00of00j[~qof%Mj[";

  // UseEffects

  // Renders
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notes</Text>
          <Text style={styles.subtitle}>
            Hey, {user?.authStore.user?.displayName}! 👋
          </Text>
        </View>

        <Image
          transition={1000}
          contentFit="cover"
          style={styles.image}
          placeholder={blurhash}
          source={user?.authStore.user?.photoURL}
        />
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.claro,
  },

  header: {
    padding: Spacings.space,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  title: {
    ...Fonts.header4,
  },

  subtitle: {
    ...Fonts.bodyText,
    color: Colors.variants.one,
  },

  image: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 100,
  },
});

export default Header;
