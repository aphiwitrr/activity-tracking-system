<template>
  <v-row>
    <v-col v-for="n in 12" :key="n" cols="6" md="3">
      <BasicCard
        :title="`News ${n}`"
        :subtitle="new Date().toLocaleDateString()"
        text="lorem"
        :img-path="`https://picsum.photos/seed/${n}/280/120`"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import BasicCard from '@/components/BasicCard.vue'
</script>
