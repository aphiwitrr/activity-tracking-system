<template>
  <v-navigation-drawer
    v-model="drawer.isDrawerOpen"
    :rail="rail"
    @click.stop="rail = false"
    mobile-breakpoint="md"
  >
    <v-list-item prepend-icon="mdi-home" @click="router.push('/')">
      {{ t('home') }}
      <template #append>
        <v-btn
          v-if="isLargeScreen"
          icon="mdi-chevron-left"
          variant="text"
          @click.stop="rail = true"
        >
        </v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
    <Drawer_AdminItems />
    <v-divider></v-divider>
    <Drawer_StudentItems />
    <template #append>
      <v-row class="d-flex justify-space-between align-center px-2" no-gutters>
        <v-btn-group>
          <v-btn :icon="iconTheme" @click="toggleTheme"></v-btn>
        </v-btn-group>
        <p>{{ appVersion }}</p>
      </v-row>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useDrawerStore } from '@/stores/drawer'
import { appVersion, isLargeScreen } from '@/utils/screenSize'
import { computed, ref } from 'vue'
import { useLocale, useTheme } from 'vuetify'
import Drawer_AdminItems from './drawer/Drawer_AdminItems.vue'
import Drawer_StudentItems from './drawer/Drawer_StudentItems.vue'
const { t } = useLocale()
const drawer = useDrawerStore()
const rail = ref(false)

const iconTheme = computed(() =>
  theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'
)

const theme = useTheme()
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'lightBUU' : 'darkBUU'
}
</script>
