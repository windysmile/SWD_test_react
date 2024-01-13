import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "form": "Form & Table",
      "layout": "Layout & Style"
    }
  },
  th: {
    translation: {
      "form": "จัดการหน้าฟอร์ม",
      "layout": "จัดการหน้าเว็บ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;