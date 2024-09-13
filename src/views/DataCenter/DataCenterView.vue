<template>
  <v-container>
    <h2 class="text-center my-5">
      ELOs (Institutional level) > PLOs (Program level) > CLOs (Course level)
    </h2>
    <v-row no-gutters class="d-flex">
      <v-col
        cols="12"
        lg="4"
        class="d-flex justify-space-evenly my-5"
        v-for="d in listStandardEDC"
        :key="d.title"
      >
        <v-card max-width="330" min-height="500" rounded="lg">
          <v-card-title class="text-wrap"> {{ d.title }}</v-card-title>
          <v-card-subtitle> {{ d.subtitle }} </v-card-subtitle>
          <v-divider class="mt-4"></v-divider>
          <v-card-text>
            {{ d.content }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { listStandardEDC } from '@/models/data'
</script>
