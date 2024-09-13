<script setup lang="ts">
import { appBarMenu } from '@/models/navigation'
import MainAppBar from '../components/MainAppBar.vue'
import MainFooter from '../components/MainFooter.vue'
import { useLocale } from 'vuetify'
const { t } = useLocale()
</script>

<template>
  <MainAppBar></MainAppBar>
  <v-app-bar class="bg-primary" flat scroll-behavior="fully-hide">
    <v-container style="max-width: 1440px">
      <v-btn v-for="nav in appBarMenu" :key="nav.title" color="white" :to="nav.to">
        {{ t(nav.title) }}
      </v-btn>
    </v-container>
  </v-app-bar>
  <v-main app>
    <v-container style="min-height: 100vh; max-width: 1440px" class="mx-auto overflow-y-auto" fluid>
      <RouterView />
    </v-container>
  </v-main>
  <MainFooter></MainFooter>
  <!-- <div :style="{ zIndex: 1000, position: 'fixed', right: '28px', bottom: '28px' }">
        <v-speed-dial class="ms-5 mb-5" size="64">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              color="accent-3"
              class="rounded-circle"
              v-bind="activatorProps"
              size="large"
              icon="mdi-menu"
            ></v-btn>
          </template>

          <v-btn color="accent-3" key="1" icon="mdi-check-circle" class="rounded-circle"></v-btn>
          <v-btn
            color="accent-3"
            key="2"
            icon="mdi-information"
            class="rounded-circle"
            to="/AddIFAAIView"
          ></v-btn>
          <v-btn
            color="accent-3"
            key="3"
            icon="mdi-alert"
            class="rounded-circle"
            to="MainAdmin"
          ></v-btn>
          <v-btn color="accent-3" key="4" icon="mdi-close-circle" class="rounded-circle"></v-btn>
        </v-speed-dial>
      </div> -->
</template>
