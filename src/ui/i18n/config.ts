import { I18n } from "i18n-js";
import { deviceLanguage } from "@/config/expoLocalization";

import SpanishLanguage from "@/config/locales/spanish.json";
import EnglishLanguage from "@/config/locales/spanish.json";

const i18n = new I18n({
  en: EnglishLanguage,
  spa: SpanishLanguage,
});

i18n.locale = deviceLanguage;

i18n.enableFallback = true;

export default i18n;
