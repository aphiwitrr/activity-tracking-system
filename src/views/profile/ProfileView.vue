<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-5">
          <template #text>
            <v-row class="d-flex justify-center">
              <v-img
                :src="profile?.picture"
                min-width="200"
                min-height="200"
                max-width="200"
                max-height="200"
                class="rounded-circle"
              ></v-img>
            </v-row>
            <div class="mt-5 text-center">
              <p>{{ profile?.email }}</p>
              <p>{{ profile?.name }}</p>
            </div>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="pa-5">
          <p class="text-header">History</p>
          <p class="text-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum porro, tenetur quasi
            nam nesciunt praesentium distinctio. Distinctio tenetur cumque perspiciatis ullam fuga,
            id numquam sit nobis nesciunt obcaecati non maxime!
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import type { Profile } from '@/types/Profile'
import { onMounted, ref } from 'vue'

const auth = useAuthStore()
const profile = ref<Profile | null>()

onMounted(async () => {
  profile.value = await auth.fetchProfile()
})
</script>
