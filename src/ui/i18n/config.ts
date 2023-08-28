import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Localization from "@/config/expoLocalization";

import SpanishLanguage from "@/config/locales/spanish.json";
import EnglishLanguage from "@/config/locales/spanish.json";

const resources = {
  en: {
    translation: EnglishLanguage,
  },
  es: {
    translation: SpanishLanguage,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: Localization.locale,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
