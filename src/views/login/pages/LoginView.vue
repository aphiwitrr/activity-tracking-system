<script setup lang="ts">
import LanguageBtns from '@/components/LanguageBtns.vue'
import { useAuthStore } from '@/stores/auth'
import GoogleButton from '@/views/login/components/GoogleButton.vue'
import { ref } from 'vue'
import { useDisplay, useLocale } from 'vuetify'

const authStore = useAuthStore()
const visible = ref(false)

const { t } = useLocale()
</script>

<template>
  <v-card
    flat
    class="mx-auto pa-12 d-flex justify-center align-center"
    max-width="1080"
    :style="{ minHeight: '488px' }"
    rounded="xl"
  >
    <v-row>
      <v-col cols="12" md="6">
        <a href="/">
          <v-img class="mx-auto my-6" max-width="380" src="/img/logo-buu-2.png"></v-img>
        </a>
      </v-col>
      <v-divider v-if="useDisplay().mdAndUp.value" vertical></v-divider>
      <v-col cols="12" md="6">
        <div class="d-flex justify-end">
          <LanguageBtns />
        </div>
        <div class="text-subtitle-1 text-medium-emphasis">{{ t('email') }}</div>
        <v-form @submit.prevent="authStore.login()">
          <v-text-field
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="authStore.form.email"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            {{ t('password') }}

            <a
              class="text-caption text-decoration-none text-blue"
              href="/"
              rel="noopener noreferrer"
              target="_blank"
            >
              {{ t('forgetPassword') }}</a
            >
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            v-model="authStore.form.password"
          ></v-text-field>

          <v-btn class="mb-8 customHover" color="buu-gold" size="large" width="100%" type="submit">
            {{ t('login') }}
          </v-btn>
          <GoogleButton />
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
* {
  font-family: 'Kanit';
}
</style>
