import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "username": "Username",
      "password": "Password",
      "login": "Log In",
      "profile": "Profile",
      "settings": "Settings",
      "logout": "Log Out",
      "home": "Home",
      "remember me": "Remember me",
      "dashboard": "Dashboard",
      "calendar": "Calendar",
      "app description": "The Families_Share project is developing a social networking and awareness-raising platform dedicated to encouraging childcare and work/life balance",
      "signin prompt": "Sign in to your account"
    }
  },
  it: {
    translation: {
      "username": "Nome Utente",
      "password": "Password",
      "login": "Accedi",
      "profile": "Profilo",
      "settings": "Impostazioni",
      "logout": "Esci",
      "home": "Casa",
      "remember me": "Ricordami",
      "dashboard": "Pannello",
      "calendar": "Calendario",
      "app description": "Il progetto Families_Share sta sviluppando una piattaforma volta a favorire la diffusione di reti sociali e la sensibilizzazione nell'ambito della cura all'infanzia e dell'equilibrio vita-lavoro",
      "signin prompt": "Sign in to your account"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;