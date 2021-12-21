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
      "email": "Email",
      "login": "Log In",
      "profile": "Profile",
      "settings": "Settings",
      "logout": "Log Out",
      "home": "Home",
      "remember me": "Remember me",
      "dashboard": "Dashboard",
      "calendar": "Calendar",
      "app description": "The Families_Share project is developing a social networking and awareness-raising platform dedicated to encouraging childcare and work/life balance",
      "signin prompt": "Sign in to your account",
      "open group": "Open Group: Anybody can join",
      "closed group": "Closed Group: Only on invite",
      "join": "Join",
      "your groups": "Your Groups",
      "no results": "No Resoults",
      "your activities": "Your Activities",   // forse non usata
      "search": "Type Here...",
      "search groups": "Search a Group",
      "groups": "Groups",
      "activities": "Activities",
      "search activities" : "Search an Activity",
      "your events": "Your Events",
      "close": "Close",
      "mon": "Mon",
      "tue": "Tue",
      "wed": "Wed",
      "thu": "Thu",
      "fri": "Fri",
      "sat": "Sat",
      "sun": "Sun",
      "your calendar": "Your Calendar",
      "leave": "Leave"
    }
  },
  it: {
    translation: {
      "username": "Nome Utente",
      "password": "Password",
      "email": "Email",
      "login": "Accedi",
      "profile": "Profilo",
      "settings": "Impostazioni",
      "logout": "Esci",
      "home": "Casa",
      "remember me": "Ricordami",
      "dashboard": "Pannello",
      "calendar": "Calendario",
      "app description": "Il progetto Families_Share sta sviluppando una piattaforma volta a favorire la diffusione di reti sociali e la sensibilizzazione nell'ambito della cura all'infanzia e dell'equilibrio vita-lavoro",
      "signin prompt": "Entra nel tuo account",
      "open group": "Gruppo Aperto: Chiunque può unirsi",
      "closed group": "Gruppo Chiuso: Solo su invito",
      "join": "Unisciti",
      "your groups": "I tuoi Gruppi",
      "no results": "Nessun Risultato",
      "your activities": "Le tue Attività",
      "search": "Scrivi Qui...",
      "search groups": "Cerca un Gruppo",
      "groups": "Gruppi",
      "activities": "Attività",
      "search activities": "Cerca una Attività",
      "your events": "I tuoi Eventi",
      "close": "Chiudi",
      "mon": "Lun",
      "tue": "Mar",
      "wed": "Mer",
      "thu": "Gio",
      "fri": "Ven",
      "sat": "Sab",
      "sun": "Dom",
      "your calendar": "Il tuo Calendario",
      "leave": "Lascia"
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