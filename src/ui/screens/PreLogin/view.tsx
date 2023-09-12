// Librerias
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Pressable, Platform, Image } from "react-native";
import LottieView from "lottie-react-native";
import { Link } from "@react-navigation/native";
import { Translate, TranslateHelper } from "@/ui/i18n";
import { SafeAreaView } from "react-native-safe-area-context";

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
import { PreLoginViewModel } from "./viewModel";

// Tipado
type Props = {
  navigation: any;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta pantalla se encargara de mostrarle al usuario que opciones tiene disponible y redirigir a donde sea necesario
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <PreLogin />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const PreLogin = ({ navigation }: Props): JSX.Element => {
  // Estados
  const [viewModel] = useState(() => new PreLoginViewModel())

  // Contextos

  // Hooks
  const animation: any = useRef(null);

  // Funciones
  const handleGoogle = () => {
    viewModel.signInWithGoogle();
  };

  // UseEffects
  useEffect(() => {
    animation.current?.play();
  }, []);

  // Renders
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.animationContainer}>
        {Platform.OS === "ios" ? (
          <LottieView
            ref={animation}
            cacheComposition
            renderMode="AUTOMATIC"
            cacheStrategy="strong"
            source={require("@/ui/assets/animations/Notesprelogin_optimized.json")}
          />
        ) : (
          <Image
            resizeMethod="auto"
            resizeMode="contain"
            style={styles.image}
            source={require("@/ui/assets/images/static/Notes_prelogin.jpg")}
          />
        )}
      </View>

      <Translate langkey="prelogin.title" style={styles.title} />
      <Translate langkey="prelogin.subtitle" style={styles.subTitle} />

      <Pressable onPress={handleGoogle} style={[styles.buttons, { backgroundColor: Colors.oscuro }]}>
        <Translate
          langkey="prelogin.google"
          style={[styles.buttonsLabel, { color: Colors.claro }]}
        />
      </Pressable>

      <Pressable style={styles.buttons}>
        <Translate langkey="prelogin.apple" style={styles.buttonsLabel} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Login')} style={styles.buttons}>
        <Translate langkey="prelogin.email" style={styles.buttonsLabel} />
      </Pressable>

      <Link style={styles.links} to={{ screen: "SignUp" }}>
        {TranslateHelper("prelogin.signup")}
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacings.spacex2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: Colors.claro,
  },

  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
  },

  image: {
    marginBottom: Spacings.space,
    width: "100%",
    height: "100%",
  },

  title: {
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
});

export default PreLogin;
