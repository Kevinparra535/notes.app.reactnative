// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { observer } from "mobx-react-lite";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "@react-navigation/native";

// Contextos

// Hooks

// Screens

// Componentes
import { PickAvatarViewModel } from "./viewModel";
import ImageSlider from "./components/ImageSlider";
import { Translate, TranslateHelper } from "@/ui/i18n";

// Navigations

// Imagenes

// Estilos
import Fonts from "@/ui/styles/Fonts";
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  navigation: any;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta vista se encarga de mostrarle al usuario una serie de avatars para poder selccionar el que mejor lo identifique
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

const PickAvatar: React.FC<Props> = observer(({ navigation }) => {
  // Estados
  const [viewModel] = useState(() => new PickAvatarViewModel());
  const [page, setPage] = useState(0);

  // Contextos

  // Hooks

  // Funciones
  const items = [
    require("@/ui/assets/images/static/avatar1.png"),
    require("@/ui/assets/images/static/avatar2.png"),
    require("@/ui/assets/images/static/avatar3.png"),
    require("@/ui/assets/images/static/avatar4.png"),
    require("@/ui/assets/images/static/avatar5.png"),
    require("@/ui/assets/images/static/avatar6.png"),
    require("@/ui/assets/images/static/avatar7.png"),
    require("@/ui/assets/images/static/avatar8.png"),
    require("@/ui/assets/images/static/avatar9.png"),
  ];

  const handleScroll = (e: any) => {
    setPage(e.nativeEvent.position);
  };

  const handlePickAvatar = () => {
    viewModel.setNewAvatar(`avatar${page + 1}.png`);
  };

  // UseEffects

  // Renders
  return (
    <SafeAreaView style={styles.container}>
      <Translate langkey="pickavatar.title" style={styles.title} />
      <Translate langkey="pickavatar.subtitle" style={styles.subTitle} />

      <ImageSlider page={page} handleScroll={handleScroll} items={items} />

      <View style={{ alignItems: "center", width: "100%" }}>
        <Pressable onPress={handlePickAvatar} style={styles.buttons}>
          <Translate langkey="pickavatar.button" style={styles.buttonsLabel} />
        </Pressable>

        <Link style={styles.links} to={{ screen: "SignUp" }}>
          {TranslateHelper("pickavatar.link")}
        </Link>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: Spacings.spacex2,
    flex: 1,
    alignItems: "center",
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
});

export default PickAvatar;
