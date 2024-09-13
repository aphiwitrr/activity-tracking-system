<script setup lang="ts">
import BasicCard from '@/components/BasicCard.vue'
import { listFaculties } from '@/models/faculties'
</script>

<template>
  <div>
    <v-carousel show-arrows="hover" cycle continuous height="240">
      <v-carousel-item
        v-for="n in 3"
        :key="n"
        :src="`https://picsum.photos/seed/${n}/1280/720`"
        cover
      ></v-carousel-item>
    </v-carousel>
    <v-row class="mt-5">
      <v-col cols="6" md="3" v-for="(data, index) in listFaculties" :key="data.eng">
        <BasicCard
          :title="data.thai"
          :subtitle="data.eng"
          text="lorem"
          :img-path="`https://picsum.photos/seed/${index}/280/120`"
        />
      </v-col>
    </v-row>
  </div>
</template>
