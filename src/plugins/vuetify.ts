// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { md2 } from 'vuetify/blueprints'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'
import i18n from './i18n'
import { createVuetify } from 'vuetify'
import { VTreeview } from 'vuetify/labs/VTreeview'

const lightBUU = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#00396B',
    secondary: '#012A4F',
    trinary: '#1B2432',
    'buu-gold': '#FACE00',
    'buu-grey': '#7C7C7C',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'trow-even': '#ffffff',
    'trow-odd': '#f3f3f3',
    'table-text': '#000000'
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000'
  }
}

const darkBUU = {
  dark: true,
  colors: {
    background: '#0f0f1e',
    surface: '#15152f',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#15152f',
    secondary: '#1C1C36',
    trinary: '#2d203f',
    'buu-gold': '#FACE00',
    'buu-grey': '#7C7C7C',
    error: '#eb536f',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'trow-even': '#141029',
    'trow-odd': '#1b1636',
    'table-text': '#f3f3f3'
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000'
  }
}

export default createVuetify({
  blueprint: md2,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'lightBUU',
    themes: {
      lightBUU,
      darkBUU
    }
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  },
  components: {
    VTreeview
  },
  defaults: {
    VBtn: {
      variant: 'flat'
    },
    VTextField: {
      density: 'comfortable',
      variant: 'outlined'
    },
    VCombobox: {
      density: 'comfortable',
      variant: 'outlined'
    }
  }
})
