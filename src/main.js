import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";

import fr from "./locales/fr.json";
import en from "./locales/en.json";
import es from "./locales/es.json";

const messages = {
  fr,
  en,
  es,
};

const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "en",
  messages,
});

createApp(App).use(i18n).mount("#app");
