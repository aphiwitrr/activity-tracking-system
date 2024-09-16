<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { onMounted, ref } from 'vue'
import LanguageBtns from './LanguageBtns.vue'
import { useLocale } from 'vuetify'
import { useAuthStore } from '@/stores/auth'
import { useDrawerStore } from '@/stores/drawer'
import { appVersion, isSmallScreen } from '@/utils/screenSize'
import type { Profile } from '@/types/Profile'
import router from '@/router'

const { t } = useLocale()

const drawer = useDrawerStore()
const searchS = useSearchStore()

const auth = useAuthStore()
const profile = ref<Profile | null>()

onMounted(async () => {
  profile.value = await auth.fetchProfile()
})
</script>

<template>
  <v-app-bar class="w-screen bg-secondary px-3" height="65" flat>
    <template #prepend>
      <div v-if="isSmallScreen" class="d-flex ga-3" :style="{ width: '200px' }">
        <v-app-bar-nav-icon
          v-if="isSmallScreen && auth.isAuthenticated"
          @click="() => drawer.switchDrawer()"
        />
        <v-img src="/img/logo-buu-2_1.png" max-width="70px"></v-img>
      </div>
      <div v-else :style="{ width: '179px' }">
        <v-img src="/img/logo-buu-2_1.png" max-width="70px"></v-img>
      </div>
    </template>
    <template #append>
      <div class="d-flex align-center" v-if="isSmallScreen">
        <LanguageBtns />
        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" icon="mdi-dots-vertical"></v-btn>
          </template>
          <v-list>
            <v-list-item
              v-if="!auth.isAuthenticated"
              :title="t('login')"
              to="/login"
              append-icon="mdi-login"
            >
            </v-list-item>
            <v-list-item v-else :title="t('profile')" to="/profile" append-icon="mdi-account">
            </v-list-item>
            <v-list-item
              :title="t('search')"
              append-icon="mdi-magnify"
              @click="() => searchS.switchToggle()"
            >
            </v-list-item>
            <v-list-item
              v-if="auth.isAuthenticated"
              :title="t('logout')"
              append-icon="mdi-logout"
              @click="() => searchS.switchToggle()"
            >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <!-- large screen -->
      <div>
        <!-- <div v-if="!auth.isAuthenticated" class="d-flex ga-4">
          <LanguageBtns />
          <v-btn class="bg-buu-gold" to="/login">
            <p class="font-weight-bold">{{ t('login') }}</p>
          </v-btn>
        </div> -->
        <div>
          <v-row no-gutters class="d-flex ga-3 align-center">
            <v-col cols="auto">
              <v-text-field
                v-if="!isSmallScreen"
                @click="() => searchS.switchToggle()"
                append-inner-icon="mdi-magnify"
                variant="solo"
                class="shrink"
                density="compact"
                width="150"
                :placeholder="`${t('search')}...`"
                readonly
                hide-details
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-btn
                prepend-icon="mdi-cog"
                variant="outlined"
                color="buu-gold"
                @click="() => router.push('/MainIFAdmin')"
                min-width="125"
                height="40"
                >{{ t('manage') }}</v-btn
              >
            </v-col>
            <v-col>
              <LanguageBtns />
            </v-col>
            <v-col>
              <v-avatar color="white" :style="{ cursor: 'pointer' }">
                <v-img :src="profile?.picture" draggable="false"></v-img>
                <v-menu activator="parent">
                  <v-list>
                    <v-list-item append-icon="mdi-account" to="/profile">
                      {{ t('profile') }}
                    </v-list-item>
                    <v-list-item append-icon="mdi-logout" @click="auth.logout()">
                      {{ t('logout') }}
                    </v-list-item>
                    <v-list-item>
                      <p class="text-center text-medium-emphasis">
                        {{ appVersion }}
                      </p></v-list-item
                    >
                  </v-list>
                </v-menu>
              </v-avatar>
            </v-col>
          </v-row>
        </div>
      </div>
    </template>
  </v-app-bar>
</template>
