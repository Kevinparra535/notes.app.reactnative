// FontLoader.js

import * as Font from "expo-font";

const fonts = {
  "poppins-black": require("@/ui/assets/fonts/Poppins/Poppins-Black.ttf"),
  "poppins-blackitalic": require("@/ui/assets/fonts/Poppins/Poppins-BlackItalic.ttf"),
  "poppins-bold": require("@/ui/assets/fonts/Poppins/Poppins-Bold.ttf"),
  "poppins-bolditalic": require("@/ui/assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
  "poppins-extrabold": require("@/ui/assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
  "poppins-extrabolditalic": require("@/ui/assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf"),
  "poppins-extralight": require("@/ui/assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
  "poppins-extralightitalic": require("@/ui/assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf"),
  "poppins-italic": require("@/ui/assets/fonts/Poppins/Poppins-Italic.ttf"),
  "poppins-light": require("@/ui/assets/fonts/Poppins/Poppins-Light.ttf"),
  "poppins-lightitalic": require("@/ui/assets/fonts/Poppins/Poppins-LightItalic.ttf"),
  "poppins-medium": require("@/ui/assets/fonts/Poppins/Poppins-Medium.ttf"),
  "poppins-mediumitalic": require("@/ui/assets/fonts/Poppins/Poppins-MediumItalic.ttf"),
  poppins: require("@/ui/assets/fonts/Poppins/Poppins-Regular.ttf"),
  "poppins-semibold": require("@/ui/assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  "poppins-semibolditalic": require("@/ui/assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf"),
  "poppins-thin": require("@/ui/assets/fonts/Poppins/Poppins-Thin.ttf"),
  "poppins-thinitalic": require("@/ui/assets/fonts/Poppins/Poppins-ThinItalic.ttf"),
  Menlo: require("@/ui/assets/fonts/Menlo/Menlo-Regular.ttf"),
};

async function loadFonts() {
  try {
    await Font.loadAsync(fonts);
    return true;
  } catch (error) {
    console.error("Error loading fonts:", error);
    return false;
  }
}

export default loadFonts;
