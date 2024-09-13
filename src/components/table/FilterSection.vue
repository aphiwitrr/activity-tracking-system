<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import http from '../../service/http'
import SearchTextfield from './SearchTextfield.vue'
import { useLocale } from 'vuetify'

const props = defineProps<{
  fetchFab?: (search: string, facultyId: string, branchId: string) => void
  fetchSearch?: (search: string) => Promise<void>
}>()

const faculties = ref<any[]>([])
const selectedFaculty = ref<any>(null)
const selectedBranch = ref<any>(null)
const branches = ref<any[]>([])
const disabled = ref(true)
const { t } = useLocale()

// Fetch faculties and branches
const fetchFacultiesAndBranches = async () => {
  try {
    const response = await http.get('/faculties/getBranchIds') // Adjust the URL as needed
    faculties.value = response.data
  } catch (error) {
    console.error('Failed to fetch faculties and branches:', error)
  }
}

// Watch for changes in selectedFaculty and update branches accordingly
watch(selectedFaculty, (newFaculty) => {
  if (newFaculty && newFaculty.branches) {
    branches.value = newFaculty.branches
    selectedBranch.value = branches.value[0]
    disabled.value = false
  } else {
    branches.value = []
    selectedBranch.value = null
    disabled.value = true
  }
})

watch(selectedBranch, (newBranch) => {
  if (newBranch && props.fetchFab) {
    props.fetchFab('', selectedFaculty.value.id, newBranch.id)
  } else {
    branches.value = []
  }
})

// const handleBranchChange = (branchId: string, facultyId: string) => {
//   console.log('branchId : ', branchId, '   facultyId : ', facultyId)
//   // Call the fetchData function with the new parameters
//   props.fetchData('', facultyId, branchId)
// }

onMounted(() => {
  fetchFacultiesAndBranches()
})
</script>

<template>
  <v-row no-gutters class="d-flex ga-5">
    <v-col v-if="fetchSearch">
      <SearchTextfield :label="t('search')" :fetch-data="fetchSearch" />
    </v-col>
    <v-col v-if="fetchFab">
      <v-select
        v-model="selectedFaculty"
        density="comfortable"
        :items="faculties"
        item-title="name"
        item-value="id"
        :label="t('faculty')"
        clearable
        variant="outlined"
        rounded="lg"
        :return-object="true"
      ></v-select>
    </v-col>
    <v-col v-if="fetchFab">
      <v-select
        v-model="selectedBranch"
        density="comfortable"
        :items="branches"
        item-title="name"
        item-value="id"
        :label="t('branch')"
        variant="outlined"
        rounded="lg"
        :return-object="true"
      ></v-select>
    </v-col>
  </v-row>
</template>
