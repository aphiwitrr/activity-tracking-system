import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import th from '../locales/th.json'

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'th',
  fallbackLocale: 'en',
  messages: { en, th }
})

export default i18n
