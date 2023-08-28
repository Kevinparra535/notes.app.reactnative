import { getLocales } from 'expo-localization';

export const deviceLanguage = getLocales()[0].languageCode;