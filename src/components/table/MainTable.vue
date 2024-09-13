<template>
  <div>
    <p class="text-header my-5 font-weight-bold ga-3 d-flex">
      <v-icon :icon="pageIcon"></v-icon>
      {{ pageTitle }}
    </p>

    <v-container fluid class="d-flex ma-0 pa-0 ga-4">
      <FilterBox :fetch-search="fetchSearch" :fetch-fab="fetchFab" />
      <v-btn
        v-if="btnAddAction"
        prepend-icon="mdi-plus"
        rounded="lg"
        :style="{ minHeight: '48px', minWidth: '150px' }"
        @click="btnAddAction"
        >{{ t('add') }}
      </v-btn>
    </v-container>
    <v-card rounded="lg">
      <v-data-table-server
        class="bg-primary"
        :items-per-page="itemsPerPage ?? 10"
        :headers="
          headers.concat(
            props.action ? [{ title: t('actions'), key: 'actions' }] : []
          ) as ReadonlyArray<any>
        "
        :items="items"
        :items-length="10"
        @update:options="updateOptions"
      >
        <!-- <template #headers="{ columns, isSorted, getSortIcon, toggleSort }">
          <tr>
            <template v-for="column in columns" :key="column.key">
              <td>
                <span class="cursor-pointer" @click="() => toggleSort(column)">{{
                  t(column.title!)
                }}</span>
                <template v-if="isSorted(column)">
                  <v-icon :icon="getSortIcon(column)"></v-icon>
                </template>
              </td>
            </template>
          </tr>
        </template> -->
        <template #item="{ item, index, columns }">
          <tr :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
            <td v-for="column in columns" :key="column.key!">
              <v-btn
                v-if="column.key === 'actions' && action"
                icon="mdi-file-document-edit"
                size="small"
                variant="tonal"
                color="table-text"
                @click="action(item)"
              ></v-btn>
              <div v-if="column.key === customCol">
                <slot :name="customCol" :item="item" :index="index"></slot>
              </div>
              <p v-else>
                {{ item[column.key as keyof typeof item] }}
              </p>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import type { HeaderItem } from '@/types/HeaderItem'
import type { PageParams, SortItem } from '@/types/PageParams'
import { onMounted, reactive, ref } from 'vue'
import { useLocale } from 'vuetify'
import FilterBox from './FilterSection.vue'

const { t } = useLocale()

const props = defineProps<{
  pageIcon: string
  pageTitle: string
  headers: HeaderItem[]
  itemsPerPage?: number
  items: Record<string, any>[]
  fetchSearch: (value: string) => Promise<void>
  fetchFab?: (value: string) => Promise<void>
  btnAddAction?: () => void
  action?: (item: any) => void
  customCol?: string
}>()

const params = reactive<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: '',
  columnId: '',
  columnName: ''
})

const sortBy = ref<SortItem[]>([{ key: 'id', order: 'asc' }])

const updateOptions = (options: any) => {
  if (options.sortBy.length === 0) {
    // Set default sort when sortBy is empty
    sortBy.value = [{ key: 'id', order: 'asc' }]
  } else {
    // Update sortBy and sortDesc based on user selection
    sortBy.value = options.sortBy
  }
  // toUpperCase
  params.sort = sortBy.value[0].key
  if (sortBy.value[0].order === 'desc') {
    params.order = 'DESC'
  } else {
    params.order = 'ASC'
  }
  props.fetchSearch
}

onMounted(async () => {
  if (props.fetchSearch) {
    await props.fetchSearch
  }
})
</script>

<style scoped>
.even-row {
  background-color: rgb(var(--v-theme-trow-even));
  color: rgb(var(--v-theme-table-text));
}
.odd-row {
  background-color: rgb(var(--v-theme-trow-odd));
  color: rgb(var(--v-theme-table-text));
}
</style>
