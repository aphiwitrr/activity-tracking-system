<template>
  <v-card rounded="lg" hover>
    <v-card-title>
      <p class="text-subtitle">
        {{ title }}
      </p>
    </v-card-title>
    <v-card-subtitle>
      <p class="text-content">
        {{ subtitle }}
      </p>
    </v-card-subtitle>
    <v-img class="mt-3" max-height="240" draggable="false" :src="imgPath" cover></v-img>
    <v-card-text>
      <p class="text-content">
        {{ text }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  subtitle: string
  text: string
  imgPath: string
}>()
</script>
