<template>
  <v-dialog v-model="store.isDialogOpen">
    <v-card
      class="mx-auto pt-7"
      rounded="lg"
      :style="{ maxWidth: '500px', minWidth: '500px', maxHeight: '500px' }"
    >
      <v-card-text>
        <div class="d-flex ga-2">
          <v-text-field
            autofocus
            rounded="lg"
            prepend-inner-icon="mdi-magnify"
            v-model="searchText"
            :label="`${t('search')}`"
            @keyup.enter="handleSelect"
          >
          </v-text-field>
          <v-btn
            variant="plain"
            icon="mdi-close-box"
            color="error"
            @click="closeAndClear()"
          ></v-btn>
        </div>
        <v-list v-if="searchText.length > 0 && filteredItems.length > 0">
          <v-list-item
            v-for="(item, index) in filteredItems"
            :key="index"
            :to="item.to"
            @click="closeAndClear()"
          >
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { getAllAppMenu } from '@/models/navigation'
import router from '@/router'
import { useSearchStore } from '@/stores/search'
import { ref, computed, onUnmounted } from 'vue'
import { useLocale } from 'vuetify'

const { t } = useLocale()
const store = useSearchStore()
const searchText = ref('')

const items = getAllAppMenu()

const handleSelect = () => {
  const path = filteredItems.value[0].to
  console.log(path)
  router.push(path)
  closeAndClear()
}

const closeAndClear = () => {
  store.switchToggle()
  searchText.value = ''
}

onUnmounted(() => closeAndClear())

const resultLimit = 5

const filteredItems = computed(() => {
  const search = searchText.value.toLowerCase()
  return items.filter((item) => item.title!.toLowerCase().includes(search)).slice(0, resultLimit)
})
</script>
