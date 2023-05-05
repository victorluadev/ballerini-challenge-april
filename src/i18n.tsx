import i18next from "i18next";
import {initReactI18next} from "react-i18next";

import translationEnglish from "./translations/English/translation.json";
import translationPortuguese from "./translations/Portuguese/translation.json";

const resources = {
  en: {
    translation: translationEnglish
  },
  ptBR: {
    translation: translationPortuguese
  }
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng: "ptBR"
});

export default i18next;