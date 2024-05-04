import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ar,de,fr,it,es } from "./translations/Index";

const resources = {
  en: {
    translation: en,
  },
 
 
  ar: {
    translation: ar,
  },

  de: {
    translation: de,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  es: {
    translation: es,
  },
}

i18next.use(initReactI18next).init({
  debug: true,
  lng: 'en',
  compatibilityJSON: 'v3',
  //language to use if translation in user language is not available
  fallbackLng: 'en',
  resources,
})

export default i18next;
