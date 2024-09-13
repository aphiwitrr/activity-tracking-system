<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import http from '../service/http'

const props = defineProps<{
  fetchData: (search: string, columnId: string, columnName: string) => void
  byBranch?: boolean
  byCurriculum?: boolean
  bySubject?: boolean
  bySkill?: boolean
  byTechSkill?: boolean
}>()

const faculties = ref<any[]>([])
const branches = ref<any[]>([])
const curriculums = ref<any[]>([])
const subjects = ref<any[]>([])
const skills = ref<any[]>([])
const techSkills = ref<any[]>([])
const selectedFaculty = ref<any>(null)
const selectedBranch = ref<any>(null)
const selectedCurriculum = ref<any>(null)
const selectedSubject = ref<any>(null)
const selectedSkill = ref<any>(null)
const selectedTechSkill = ref<any>(null)

// Fetch faculties and branches
const fetchFacultiesAndBranches = async () => {
  try {
    const response = await http.get('/faculties/getAllDetails') // Adjust the URL as needed
    faculties.value = response.data
    console.log(faculties.value)
  } catch (error) {
    console.error('Failed to fetch faculties and branches:', error)
  }
}

// Watch for changes in selectedFaculty and update branches accordingly
watch(selectedFaculty, (newFaculty) => {
  if (newFaculty && newFaculty.branches) {
    branches.value = newFaculty.branches
    selectedBranch.value = branches.value[0]
    // disabled.value = false
  } else {
    branches.value = []
    selectedBranch.value = null
    // disabled.value = true
  }
})

watch(selectedBranch, (newBranch) => {
  if (newBranch) {
    if (props.byBranch) {
      props.fetchData('', newBranch.id, 'branch')
      selectedCurriculum.value = ''
    }
    if (newBranch.curriculums) {
      curriculums.value = newBranch.curriculums
      //selectedCurriculum.value = curriculums.value[0]
    } else {
      curriculums.value = []
      selectedCurriculum.value = null
    }
  }
})

watch(selectedCurriculum, (newCurriculum) => {
  if (newCurriculum) {
    if (props.byCurriculum) {
      props.fetchData('', newCurriculum.id, 'curriculum')
    }
    if (newCurriculum.subjects) {
      subjects.value = newCurriculum.subjects
      //selectedSubject.value = curriculums.value[0]
    } else {
      subjects.value = []
      selectedSubject.value = null
    }
  }
})

watch(selectedSubject, (newSubject) => {
  if (props.bySubject) {
    props.fetchData('', newSubject.id, 'subject')
  }
  if (newSubject && newSubject.skills) {
    skills.value = newSubject.skills
    //selectedSkill.value = skills.value[0]
  } else {
    skills.value = []
    selectedSkill.value = null
  }
})

watch(selectedSkill, (newSkill) => {
  if (props.bySkill) {
    props.fetchData('', newSkill.id, 'skill')
  }
  if (newSkill && newSkill.techSkills) {
    techSkills.value = newSkill.techSkills
    // selectedTechSkill.value = techSkills.value[0]
  } else {
    techSkills.value = []
    selectedTechSkill.value = null
  }
})

watch(selectedTechSkill, (newTechSkill) => {
  return props.fetchData('', newTechSkill.id, 'techSkill')
})

onMounted(() => {
  fetchFacultiesAndBranches()
})
</script>

<template>
  <v-row>
    <v-col>
      <v-select
        v-model="selectedFaculty"
        :items="faculties"
        item-title="name"
        item-value="id"
        label="Faculty"
        clearable
        variant="outlined"
        rounded="lg"
        :return-object="true"
        style="height: 55px; width: 100%; min-width: 150px"
      ></v-select>
    </v-col>
    <v-col>
      <!-- :disabled="disabled" -->
      <v-select
        v-model="selectedBranch"
        :items="branches"
        item-title="name"
        item-value="id"
        label="Branch"
        variant="outlined"
        rounded="lg"
        :return-object="true"
        style="height: 55px; width: 100%; min-width: 150px"
      ></v-select>
    </v-col>
    <v-col v-if="props.byCurriculum && props.byCurriculum">
      <!-- :disabled="disabled" -->
      <v-select
        v-model="selectedCurriculum"
        :items="curriculums"
        item-title="name"
        item-value="id"
        label="Curriculum"
        variant="outlined"
        rounded="lg"
        :return-object="true"
        style="height: 55px; width: 100%; min-width: 150px"
      ></v-select>
    </v-col>
    <v-col v-if="props.byCurriculum && props.byCurriculum && props.bySubject">
      <!-- :disabled="disabled" -->
      <v-select
        v-model="selectedSubject"
        :items="subjects"
        item-title="name"
        item-value="id"
        label="Subject"
        variant="outlined"
        rounded="lg"
        :return-object="true"
        style="height: 55px; width: 100%; min-width: 150px"
      ></v-select>
    </v-col>
    <v-col v-if="props.bySkill">
      <!-- :disabled="disabled" -->
      <v-select
        v-model="selectedSkill"
        :items="skills"
        item-title="name"
        item-value="id"
        label="Skill"
        variant="outlined"
        rounded="lg"
        :return-object="true"
        style="height: 55px; width: 100%; min-width: 150px"
      ></v-select>
    </v-col>
    <v-col v-if="props.byCurriculum && props.byCurriculum && props.bySubject && props.byTechSkill">
      <!-- :disabled="disabled" -->
      <v-select
        v-model="selectedTechSkill"
        :items="techSkills"
        item-title="name"
        item-value="id"
        label="TechSkill"
        variant="outlined"
        rounded="lg"
        :return-object="true"
        style="height: 55px; width: 100%; min-width: 150px"
      ></v-select>
    </v-col>
  </v-row>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
