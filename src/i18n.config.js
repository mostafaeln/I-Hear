import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ar } from "./translations/Index";

const resources = {
  en: {
    translation: en,
  },
 
 
  ar: {
    translation: ar,
  }
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
