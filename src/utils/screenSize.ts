import vuetify from '@/plugins/vuetify'
import { computed } from 'vue'

export const isLargeScreen = computed(() => vuetify.display.lgAndUp.value)
export const isSmallScreen = computed(() => vuetify.display.mdAndDown.value)
export const appVersion = 'v' + __APP_VERSION__.toString()
