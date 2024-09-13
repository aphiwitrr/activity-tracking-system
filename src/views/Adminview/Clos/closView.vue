<script setup lang="ts">
import cloDetailDialog from './Detail/closDetailDialog.vue'
import { computed, onMounted, ref } from 'vue'
import { useCloStore } from '@/stores/clos'
import type { PageParams } from '@/types/PageParams'

const cloStore = useCloStore()
const loading = ref(false)
const dialogVisible = ref(false)
const selectedItem = ref<any | null>(null)
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: '',
  columnId: '',
  columnName: ''
})

const headers = computed(() => [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Subject', key: 'subject' },
  { title: 'Plos', key: 'plos' }
])

const clos = computed(() => cloStore.clos || [])

const showDialog = async (item: any) => {
  // selectedItem.value = item
  if (item != null) {
    dialogVisible.value = true
    const setCurrentClo = (clo: any) => {
      cloStore.setCurrentClo(clo.id)
      console.log(cloStore.editedClo)
    }
    setCurrentClo(item)
  } else {
    //addClos
    dialogVisible.value = true
  }

  await fetchClo()
}

const closeDialog = async () => {
  await fetchClo()
  dialogVisible.value = false
}

const updateOptions = (options: any) => {
  pageParams.value.page = options.page
  pageParams.value.limit = options.itemsPerPage
  fetchClo()
}

const fetchClo = async () => {
  loading.value = true
  try {
    await cloStore.fetchClosPage(pageParams.value)
  } catch (error) {
    console.error('Error fetching curriculum:', error)
  } finally {
    loading.value = false
  }
  // console.log(pageParams.value)
}

onMounted(async () => {
  await fetchClo()
  cloStore.clearForm()
})
</script>

<template>
  <v-container fluid>
    &nbsp;
    <h2 style="margin-left: 2%; font-size: 24px; margin-bottom: 2%">CLO</h2>

    <v-spacer></v-spacer>

    <v-row>
      <v-col cols="12" md="7">
        <v-text-field
          clearable
          label="หลักสูตร"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          v-model="pageParams.search"
          rounded="lg"
          @keydown.enter="fetchClo"
          style="height: 55px; width: 100%; min-width: 300px"
        ></v-text-field>
      </v-col>

      <v-col md="3"> </v-col>
      <v-col md="2">
        <v-btn
          rounded="lg"
          style="height: 55px; min-width: 170px; width: 100%"
          @click="() => showDialog(null)"
        >
          <v-icon>mdi-plus</v-icon>&nbsp; ADD NEW</v-btn
        ></v-col
      >
    </v-row>

    <v-card rounded="lg" style="margin-top: 1%">
      <div>
        <v-data-table-server
          v-model:items-per-page="pageParams.limit"
          :headers="headers"
          :items="clos"
          :items-length="cloStore.totalClos"
          :loading="loading"
          item-value="name"
          @update:options="updateOptions"
          class="custom-header"
          style="height: auto; max-width: 2000px; width: 100%; min-width: 30vh"
          :footer-props="{ itemsPerPageText: 'Rows count' }"
        >
          <template v-slot:item="{ item, index }">
            <tr :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
              <td style="height: 55px; min-width: 150px">{{ item.id }}</td>
              <td style="height: 55px; min-width: 200px">{{ item.name }}</td>
              <td style="height: 55px; min-width: 90px">{{ item.description }}</td>
              <td style="height: 55px; min-width: 90px">{{ item.subject.engName }}</td>
              <td style="height: 55px; min-width: 90px">{{ item.plo.num_plo }}</td>
              <td>
                <v-btn
                  variant="text"
                  @click="() => showDialog(item)"
                  rounded="lg"
                  style="width: px"
                >
                  <v-icon>mdi-file-document-edit-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table-server>
      </div>
    </v-card>
  </v-container>
  <cloDetailDialog :visible="dialogVisible" :item="selectedItem" @close-dialog="closeDialog()" />
</template>

<style>
.details-text {
  margin-left: 10px; /* Adjust the spacing between the div and p as needed */
  font-weight: bold;
  font-size: large;
}

.custom-header {
  background-color: #2d487e; /* Blue header color */
  color: #ffffff;
}
.even-row {
  background-color: #f9f9f9;
  color: black;
  text-align: left;
}
.odd-row {
  background-color: #ffffff;
  color: black;
  text-align: left;
}
</style>
