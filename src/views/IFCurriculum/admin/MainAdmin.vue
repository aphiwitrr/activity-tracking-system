<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import http from '@/service/http'
import { useCurriculumStore } from '@/stores/curriculums'
import type { Curriculum } from '@/types/Curriculums'
import { useFacultyStore } from '@/stores/faculty'
import type { Faculty } from '@/types/Faculty'
import type { Branch } from '@/types/Branch'
import { useBranchStore } from '@/stores/branch'
import type { VForm } from 'vuetify/components'
import type { PageParams } from '@/types/PageParams'
import DialogAddIF from '@/views/IFCurriculum/admin/DialogAddIF.vue'

const branchStore = useBranchStore()
const curriculumStore = useCurriculumStore()
const facultyStore = useFacultyStore()
const curriculums = computed(() => curriculumStore.curriculums)
const faculties = computed(() => facultyStore.faculties)
const branches = computed(() => branchStore.branches)

const loading = ref(false)
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: ''
})
const select = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: ''
})

const dialogVisible = ref(false)
const selectedItem = ref<any | null>(null)

const showDialog = (item: any) => {
  selectedItem.value = item
  dialogVisible.value = true

  // Function to set the current curriculum in the store
  const setCurrentCurriculum = (curriculum: any) => {
    curriculumStore.setCurrentCurriculum(curriculum.id)
    console.log(curriculumStore.currentCurriculum)
  }

  // Call the function with the selected item
  setCurrentCurriculum(item)
}

const closeDialog = () => {
  dialogVisible.value = false
}
const expanded: any[] = []
const search = ref('')

const fetchCurriculum = async () => {
  loading.value = true
  try {
    await curriculumStore.fetchCurriculumsPage(pageParams.value)
    if (select.value.search == '') {
      await curriculumStore.fetchCurriculumsPage(pageParams.value)
    } else if (pageParams.value.search == '') {
      await curriculumStore.fetchCurriculumsPage(select.value)
    }
  } catch (error) {
    console.error('Error fetching curriculum:', error)
  } finally {
    loading.value = false
  }
  console.log(pageParams.value)
}

const updateOptions = (options: any) => {
  pageParams.value.page = options.page
  pageParams.value.limit = options.itemsPerPage
  fetchCurriculum()
}

onMounted(async () => {
  fetchCurriculum()
  await facultyStore.fetchFaculties()
  await branchStore.getBranches()
})
const facultiesOptions = computed(() => {
  return faculties.value.map((faculty) => {
    return `${faculty.name}`
  })
})
const headers = [
  { title: 'รหัสหลักสูตร', value: 'id' },
  { title: 'หลักสูตร', value: 'thaiName' },
  { title: 'ระยะเวลา', value: 'period' }
]
</script>
<template>
  <v-container fluid>
    &nbsp;
    <h2 style="margin-left: 2%; font-size: 24px; margin-bottom: 2%">เล่มหลักสูตร</h2>

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
          @keydown.enter="fetchCurriculum"
          style="height: 55px; width: 100%; min-width: 300px"
        ></v-text-field>
      </v-col>

      <v-col md="3">
        <v-combobox
          clearable
          label="คณะ"
          @keydown.enter="fetchCurriculum"
          v-model="select.search"
          :items="facultiesOptions"
          variant="outlined"
          rounded="lg"
          style="height: 55px; width: 100%; min-width: 150px"
        ></v-combobox>
      </v-col>
      <v-col md="2">
        <v-btn rounded="lg" style="height: 55px; min-width: 170px; width: 100%" to="/AddIFAAIView">
          <v-icon>mdi-plus</v-icon>&nbsp; ADD NEW</v-btn
        ></v-col
      >
    </v-row>

    <v-card rounded="lg" style="margin-top: 1%">
      <div>
        <v-data-table-server
          v-model:items-per-page="pageParams.limit"
          :headers="headers"
          :items="curriculumStore.curriculums"
          :items-length="curriculumStore.totalCurriculums"
          :loading="loading"
          item-value="name"
          @update:options="updateOptions"
          class="custom-header"
          style="height: auto; max-width: 2000px; width: 100%; min-width: 30vh"
          :footer-props="{ itemsPerPageText: 'Rows count' }"
        >
          <!-- <template v-slot:top>
              <v-text-field
                v-model="pageParams.search"
                label="Search"
                @keydown.enter="fetchCurriculum"
                class="mx-4"
              ></v-text-field>
            </template> -->
          <template v-slot:item="{ item, index }">
            <tr :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
              <td style="height: 55px; min-width: 150px">{{ item.id }}</td>
              <td style="height: 55px; min-width: 200px">{{ item.thaiName }}</td>
              <td style="height: 55px; min-width: 90px">{{ item.period }}</td>

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
  <DialogAddIF :visible="dialogVisible" :item="selectedItem" @close-dialog="closeDialog" />
</template>
<style scoped>
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
