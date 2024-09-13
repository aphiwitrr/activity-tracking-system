<script setup lang="ts">
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import FullLayout from './layouts/FullLayout.vue'
import CommonLayout from './layouts/CommonLayout.vue'
import SearchDialog from './components/SearchDialog.vue'
const route = useRoute()
</script>

<template>
  <v-app>
    <MainLayout v-if="route.meta.layout === 'MainLayout'" />
    <FullLayout v-if="route.meta.layout === 'FullLayout'" />
    <CommonLayout v-if="route.meta.layout === 'CommonLayout'" />
    <SearchDialog />
  </v-app>
</template>

<style>
/* deep vuetify css config for entire app*/
*,
.text-h1,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6,
.text-subtitle-1,
.text-subtitle-2,
.text-body-1,
.text-body-2,
.text-button,
.text-caption,
.text-overline {
  font-family: 'Kanit';
}
.text-header {
  font-size: 24px;
}
.text-subtitle {
  font-size: 20px;
}
.text-content {
  font-size: 18px;
}

.v-card > .v-card-title {
  font-size: 24px;
}
.v-card > .v-card-subtitle {
  font-size: 20px;
}
.v-card > .v-card-text {
  font-size: 18px;
}
.v-breadcrumbs {
  font-size: 20px;
}
</style>
