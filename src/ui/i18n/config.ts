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

const lang = Localization.locale.substr(0, 2);

const formatLang = lang !== "es" && lang !== "en" ? "es" : lang;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: formatLang,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
