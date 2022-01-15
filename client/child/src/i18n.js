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
      "your activities": "Your Activities",
      "search": "Type Here...",
      "search groups": "Search a Group",
      "groups": "Groups",
      "activities": "Activities",
      "search activities" : "Search an Activity",
      "your events": "Your Events",
      "close": "Close",
      "save": "Save",
      "mon": "Mon",
      "tue": "Tue",
      "wed": "Wed",
      "thu": "Thu",
      "fri": "Fri",
      "sat": "Sat",
      "sun": "Sun",
      "your calendar": "Your Calendar",
      "leave": "Leave",
      "name": "Name",
      "description": "Description",
      "location": "Location",
      "links": "Links",
      "submit": "Submit",
      "new activity": "New Activity",
      "event list": "Event List",
      "missing data warning": "You need to add at least one event and the activity name",
      "child username": "Child Username",
      "faq": "FAQ's",
      "continue": "Continue",
      "faq1 question": "FAQ1 : What can this app do ?",
      "faq1 answer": "You can see all the groups your parent has decided to join, and you can also create as many activities as you like within your groups and view the events you will participate in.",
      "faq2 question": "FAQ2: Can I join new groups from the app?",
      "faq2 answer": "No, in order to participate in a new group it is necessary that your parent signs up first with his account, only after this you too can view the group and create new activities within it. So if you really want to join a new group you will need to ask a parent for permission first.",
      "faq3 question": "FAQ3: What activities can be organized?",
      "faq3 answer": "In addition to the activities planned by your parents, it is also possible to create your own that involve one or more children and that concern, for example, the loan / exchange of games, books or other. You can also organize yourself with another child for activities such as school lessons and the days chosen for the meetings will be fixed in your calendar.",
      "faq4 question": "FAQ4: Can my parent see and edit what I do?",
      "faq4 answer": "Yes, your parents can see through their portal which activities you have added to and they can also remove you from them at any time! So, the advice we can give you is to always ask (before taking any action) for permission from a parent.",
      "faq5 question": "FAQ 5: What can I do with the calendar?",
      "faq5 answer": "You can see all the activities from the calendar so you can better manage your time! And if you decide to remove yourself from any of them, you will be able to do so at any time by clicking on the specific activity.",
      "faq6 question": "FAQ6: Can I change my data?",
      "faq6 answer": "No, your data can be modified only and exclusively by a parent from their portal.",
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
      "save": "Salva",
      "mon": "Lun",
      "tue": "Mar",
      "wed": "Mer",
      "thu": "Gio",
      "fri": "Ven",
      "sat": "Sab",
      "sun": "Dom",
      "your calendar": "Il tuo Calendario",
      "leave": "Lascia",
      "name": "Nome",
      "description": "Descrizione",
      "location": "Posizione",
      "links": "Links",
      "submit": "Invia",
      "new activity": "Nuova Attività",
      "event list": "Lista degli eventi",
      "missing data warning": "Bisogna aggiungere almeno un evento e il nome della attività",
      "child username": "Nome Utente Bambino",
      "faq": "Domande Frequenti",
      "continue": "Avanti",
      "faq1 question": "FAQ1 : Cosa posso fare all’interno dell’app ?",
      "faq1 answer": "Puoi vedere tutti i gruppi a cui il tuo genitore ha deciso di iscriversi, ed inoltre puoi creare quante attività vuoi a tuo piacimento all’interno dei tuoi gruppi e visualizzare gli eventi a cui parteciperai",
      "faq2 question": "FAQ2 : Posso partecipare a nuovi gruppi dall’app ?",
      "faq2 answer": "No, per poter partecipare ad un nuovo gruppo è necessario che il tuo genitore si iscriva prima col suo account, solo dopo ciò anche te potrai visualizzare il gruppo e creare nuove attività al suo interno. Quindi se vuoi proprio partecipare ad un nuovo gruppo dovrai prima chiedere il permesso ad un genitore.",
      "faq3 question": "FAQ3 : Che attività si possono organizzare ?",
      "faq3 answer": "Oltre alle attività programmate dai tuoi genitori è possibile anche crearne di tue che coinvolgono uno o più bambini e che riguardano ad esempio il prestito/scambio di giochi, libri o altro. Puoi inoltre organizzarti con un altro bambino per attività come le ripetizioni scolastiche e verranno fissati nel tuo calendario i giorni scelti per gli incontri.",
      "faq4 question": "FAQ4 : Il mio genitore può vedere e modificare quello che faccio io ?",
      "faq4 answer": "Si, i tuoi genitori possono vedere tramite il loro portale a quali attività ti sei aggiunto ed inoltre possono  rimuoverti da esse in qualsiasi momento! Quindi, il consiglio che possiamo darti è di chiedere sempre (prima di svolgere una qualsiasi azione) il permesso ad un genitore.",
      "faq5 question": "FAQ5 : Cosa posso fare col calendario ?",
      "faq5 answer": "Puoi vedere tutte le attività dal calendario in modo da poter gestire al meglio il tuo tempo! E se decidessi di rimuoverti da una di esse, sarai in grado di farlo in qualsiasi momento cliccando sopra alla specifica attività.",
      "faq6 question": "FAQ6 : Posso modificare i miei dati ?",
      "faq6 answer": "No, i tuoi dati possono essere modificati solo ed esclusivamente da un genitore dal proprio portale.",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language"),
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;