<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, type Ref } from 'vue'
import http from '@/service/http'
import { useCurriculumStore } from '@/stores/curriculums'
import type { Curriculum } from '@/types/Curriculums'
import { useUserStore } from '@/stores/user'
import type { Branch } from '@/types/Branch'
import { useBranchStore } from '@/stores/branch'
import type {} from '@/types/Faculty'
import type { VForm } from 'vuetify/components'
import { usePloStore } from '@/stores/plos'
import type { User } from '@/types/User'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'
import { useFacultyStore } from '@/stores/faculty'
import type { PageParams } from '@/types/PageParams'
import type { Subject } from '@/types/Subjects'
import { useSkillStore } from '@/stores/skills'
import type { Skill } from '@/types/Skills'
const subjects = computed(() => subjectStore.subjects)
const subjectStore = useSubjectStore()
const skillStore = useSkillStore()
const curriculumStore = useCurriculumStore()
const branchStore = useBranchStore()
const PloStore = usePloStore()
const userStore = useUserStore()
const curriculums = computed(() => curriculumStore.curriculums)
const overlay = ref(false)
const reveal = ref(false)
const reveal2 = ref(true)
const reveal3 = ref(false)
const users = computed(() => userStore.users)
const id = ref<string>('')
const thaiName = ref<string>('')
const engName = ref<string>('')
const thaiDegreeName = ref<string>('')
const engDegreeName = ref<string>('')
const description = ref<string>('')
const resultTypes = ref<string>('')
const nameRules = [(v: string) => !!v || 'Please check complete information']
const select1 = ref<string | null>(null)
const select2 = ref<any | null>(null)
const branches = computed(() => branchStore.branches)
const select3 = ref<any | null>(null)
const select4 = ref<any | null>(null)
const selectsubjects = ref<any | null>(null)
const select5 = ref<string | null>(null)
const items1 = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const items2 = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const items4 = ref<string[]>(['ความรู้', 'ทักษะ', 'จริยธรรม', 'ลักษณะบุคคล'])
const items3 = ref<string[]>(['นาย', 'นางสาว', 'นางสาว'])
const form = ref<VForm | null>(null)
const forms = ref([{ label: 'Plo1', description: '', select5: null }])
type userIds = { id: string }
type subjectsIds = { id: string }
type skillIds = { id: string }
const tab = ref<string>('option-1')
const value = ref('one')
const router = useRouter()
const pageParamsSubjects = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: '',
  columnId: '',
  columnName: ''
})

const pageParamsSkill = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: '',
  columnId: '',
  columnName: ''
})

onMounted(async () => {
  branchStore.getBranches()
  curriculumStore.fetchCurriculums()
  userStore.fetchUsers()
  subjectStore.fetchSubjects
  subjectStore.fetchSubjects(pageParamsSubjects.value)
  const coordinators = curriculumStore.currentCurriculum?.coordinators
  skillStore.fetchSkill

  skillStore.fetchSkillsPage(pageParamsSkill.value)
})

const waitForOverlay = () => {
  return new Promise((resolve) => {
    watch(
      overlay,
      (val) => {
        if (val) {
          setTimeout(() => {
            overlay.value = false
            resolve(true)
          }, 2000)
        }
      },
      { immediate: true }
    )
  })
}

function addForm() {
  const newIndex = forms.value.length + 1
  forms.value.push({ label: `Plo${newIndex}`, description: '', select5: null })
}

const removeForm = () => {
  if (forms.value.length > 1) {
    forms.value.pop()
  }
}

const removeFormJ = () => {
  if (refFormSubjects.value.length > 1) {
    refFormSubjects.value.pop()
  }
}

const validate = async () => {
  setTimeout(() => {
    reveal.value = true
  }, 300)

  reveal2.value = false
  reveal3.value = false
}

const validate2 = async () => {
  setTimeout(() => {
    reveal2.value = true
  }, 300)
  reveal.value = false
  reveal3.value = false
}

const validate3 = async () => {
  setTimeout(() => {
    reveal3.value = true
  }, 300)
  reveal2.value = false
  reveal.value = false
}

const reset = () => {
  form.value!.reset()
}

const resetValidation = () => {
  form.value!.resetValidation()
}

watch(
  () => curriculumStore.currentCurriculum,
  async (newCurriculum) => {
    if (newCurriculum) {
      await PloStore.fetchPlos()
    }
  }
)

//***************************************coordinator*************************************************** */
const initialCoordinators: userIds[] = []
const coordinator = ref<userIds[]>(
  initialCoordinators
    .filter((coord) => coord.id !== null) // Filter out items where id is null
    .map((coord) => ({
      id: coord.id!.toString() // Use non-null assertion operator to convert id to string
    }))
)

const getCoordinatorName = (id: string | null) => {
  const currentCurriculum = curriculumStore.currentCurriculum
  if (!currentCurriculum) return ''
  const coordinator = currentCurriculum.coordinators.find((coord) => coord.id === id)
  return coordinator ? coordinator.firstName : 'Unknown'
}

async function saveC() {
  console.log(coordinator.value, 'from vue') // Log the data to be sent
  if (curriculumStore.editedCurriculum?.id) {
    try {
      console.log('Payload:', coordinator.value)
      await curriculumStore.addCoordinatorToCurriculum(
        curriculumStore.editedCurriculum.id,
        coordinator.value
      )
      overlay.value = !overlay.value
      console.log('Coordinators updated successfully')
    } catch (error) {
      console.error('Error updating coordinators:')
    }
  } else {
    console.error('Edited curriculum ID is missing')
  }
}

function removeCoordinator(id: string) {
  coordinator.value = coordinator.value.filter((coord) => coord.id !== id)
}

async function addc() {
  const { valid } = await form.value!.validate()
  if (!valid) return

  const userId = select3.value.substring(0, select3.value.indexOf(' '))

  console.log(userStore.fetchUser(userId.toString))
  if (userId) {
    if (!coordinator.value) {
      coordinator.value = []
    }

    // Avoid duplicates
    const exists = coordinator.value.some((coord) => coord.id === userId)
    if (!exists) {
      coordinator.value.push({ id: userId })
      console.log(coordinator)
    }
  }
}

const userOptions = computed(() => {
  return users.value.map((user) => {
    const rolesString = Array.isArray(user.roles)
      ? user.roles.map((role) => role.name).join(', ')
      : 'No Roles'
    return `${user.id} ${user.firstName} ${user.lastName}`
  })
})

const getUserInfoById = (id: any) => {
  // Find the string in userOptions that starts with the specified id
  const userString = userOptions.value.find((userString) => userString.startsWith(`${id} `))

  // If a matching string is found, return it; otherwise, return 'User Not Found'
  return userString ? userString : 'User Not Found'
}

//*************************************** end coordinator *************************************************** */

//*************************************** curriculums ******************************************************* */

watch(select4, (newValue) => {
  if (newValue) {
    const selectedCurriculum = curriculums.value.find(
      (curriculum) => curriculum.thaiName === newValue
    )
    if (selectedCurriculum) {
      console.log(selectedCurriculum.id)
      id.value = selectedCurriculum.id
    }
  }
})
const branche = ref('')
async function save() {
  const { valid } = await form.value!.validate()
  if (!valid) return
  curriculumStore.editedCurriculum.thaiName = thaiName.value
  curriculumStore.editedCurriculum.engName = engName.value
  curriculumStore.editedCurriculum.id = id.value
  curriculumStore.editedCurriculum.thaiDegreeName = thaiDegreeName.value
  curriculumStore.editedCurriculum.engDegreeName = engDegreeName.value
  curriculumStore.editedCurriculum.description = ''
  curriculumStore.editedCurriculum.period = '4 ปี'
  curriculumStore.editedCurriculum.branch = select2.value.substring(0, select2.value.indexOf(' '))
  curriculumStore.editedCurriculum.minimumGrade = 0
  branche.value = select2.value.substring(0, select2.value.indexOf(' '))
  select2.value = select2.value.replace(/^\d+\s*/, '')
  overlay.value = !overlay.value

  await nextTick()

  await waitForOverlay()

  await curriculumStore.saveCurriculum()

  tab.value = 'option-2'
}
const branchOptions = computed(() => {
  return branches.value.map((branch) => {
    return `${branch.id} ${branch.name}`
  })
})

//*************************************** end curriculums *************************************************** */

const detailsSection = ref<HTMLElement | null>(null)

const scrollToElement = () => {
  if (detailsSection.value) {
    detailsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}
const over = async () => {
  overlay.value = !overlay.value

  await nextTick()

  await waitForOverlay()
  router.push({ name: 'MainIFAdmin' })
}

const { mdAndDown } = useDisplay()

const isMobile = computed(() => mdAndDown.value)

//*************************************** subject *************************************************** */

const subjectsOptions = computed(() => {
  return subjects.value.map((subject) => `${subject.id}`)
})
const formSubjects = ref<Subject>({
  id: '',
  thaiName: '',
  engName: '',
  credit: 0,
  studyTime: '',
  type: '3',
  description: '',
  descriptionEng: ''
})

const initialSubjects: subjectsIds[] = []
const subject = ref<subjectsIds[]>(
  initialSubjects
    .filter((subjectid) => subjectid.id !== null) // Filter out items where id is null
    .map((subjectid) => ({
      id: subjectid.id!.toString() // Use non-null assertion operator to convert id to string
    }))
)

const getSubjectsName = (id: string | null) => {
  const currentCurriculum = curriculumStore.currentCurriculum
  if (!currentCurriculum) return ''
  const subject = currentCurriculum.subjects.find((subjectid) => subjectid.id === id)
  return subject ? subject.thaiName : 'Unknown'
}

async function saveS() {
  addS()
  console.log(subject.value, 'from vue')

  if (curriculumStore.editedCurriculum?.id) {
    try {
      console.log('Payload:', subject.value)
      await curriculumStore.addSubjectToCurriculum(
        curriculumStore.editedCurriculum.id,
        subject.value
      )
      overlay.value = !overlay.value
      console.log('Subject updated successfully')
    } catch (error) {
      console.error('Error updating Subject:', error)
    }
  } else {
    console.error('Edited subject ID is missing')
  }
}

function removeSubject(id: string) {
  subject.value = subject.value.filter((subjectid) => subjectid.id !== id)
}

const refFormSubjects = ref([
  {
    label: 'รายวิชา 1',
    id: '',
    thaiName: '',
    engName: '',
    credit: 0,
    studyTime: '',
    description: ''
  }
])
async function addS() {
  const newIndex = refFormSubjects.value.length + 1

  refFormSubjects.value.push({
    label: `รายวิชา ${newIndex}`,
    id: '',
    thaiName: '',
    engName: '',
    credit: 0,
    studyTime: '',
    description: ''
  })

  const newSubject = refFormSubjects.value[refFormSubjects.value.length - 2]
  subjectStore.fetchSubjects(pageParamsSubjects.value)

  subjectStore.editedSubject.id = newSubject.id
  subjectStore.editedSubject.thaiName = newSubject.thaiName
  subjectStore.editedSubject.engName = newSubject.engName
  subjectStore.editedSubject.description = newSubject.description
  subjectStore.editedSubject.credit = newSubject.credit
  subjectStore.editedSubject.type = '3'
  subjectStore.editedSubject.studyTime = newSubject.studyTime
  await subjectStore.saveSubject
  const subjectId = newSubject.id

  if (subjectId) {
    if (!subject.value) {
      subject.value = []
    }

    // Avoid duplicates
    const exists = subject.value.some((subjectid) => subjectid.id === subjectId)
    if (!exists) {
      subject.value.push({ id: subjectId })
      console.log(subject)
    }
  }
}
const fetchSubjectById = (id: string, index: number) => {
  const subject = subjectStore.subjects.find((sub) => sub.id === id)
  if (subject) {
    return {
      thaiName: subject.thaiName,
      engName: subject.engName,
      credit: subject.credit,
      studyTime: subject.studyTime,
      description: subject.description
    }
  }

  // หากไม่พบ subject ตาม id ที่ระบุ ให้คืนค่าเดิมจาก refFormSubjects
  return {
    thaiName: refFormSubjects.value[index].thaiName,
    engName: refFormSubjects.value[index].engName,
    credit: refFormSubjects.value[index].credit,
    studyTime: refFormSubjects.value[index].studyTime,
    description: refFormSubjects.value[index].description
  }
}

// เพิ่ม watcher เพื่อตรวจจับการเปลี่ยนแปลงของ formSubjects.id
watch(
  () => refFormSubjects.value.map((f) => f.id),
  (newIds) => {
    newIds.forEach((id, index) => {
      if (id) {
        const subjectData = fetchSubjectById(id, index)
        Object.assign(refFormSubjects.value[index], subjectData)
      }
    })
  },
  { deep: true }
)
//*************************************** end subject *************************************************** */

//*************************************** skill *************************************************** */

const skillId = computed(() => skillStore.skills.map((skill) => skill.id) || [])
const color = ref('#000000')
const formSkill = ref<Skill>({
  id: '',
  name: '',
  description: '',
  children: [],
  level: 0,
  techSkills: []
})

const menu = ref(false)
const fav = ref(false)
const hints = ref(true)

const refFormSkill = ref([
  {
    label: 'สกิล 1',
    id: '',
    name: '',
    description: '',
    colorsTag: ''
  }
])
const skill = ref<skillIds[]>(
  initialSubjects
    .filter((skillid) => skillid.id !== null) // Filter out items where id is null
    .map((skillid) => ({
      id: skillid.id!.toString() // Use non-null assertion operator to convert id to string
    }))
)
const skillselect = ref<string | null>(null)

watch(skillselect, async (newValue) => {
  if (newValue) {
    await skillStore.fetchSkill(newValue)
    const skill = ref(skillStore.editedSkill)
    // Update the specific form in refFormSkill
    refFormSkill.value = refFormSkill.value.map((form, index) =>
      index === 0 // Change this condition if needed to target specific form
        ? { ...form, description: skill.value.description }
        : form
    )
  }
})
console.log(formSkill.value)

async function addSkills() {
  const newIndex = refFormSkill.value.length + 1

  refFormSkill.value.push({
    label: `สกิล ${newIndex}`,
    id: '',
    name: '',
    description: '',
    colorsTag: ''
  })

  const newSkill = refFormSkill.value[refFormSkill.value.length - 2]
  skillStore.fetchSkillsPage(pageParamsSkill.value)

  const skillId = newSkill.id
  // await subjectStore.saveSubject

  if (skillId) {
    if (!skill.value) {
      skill.value = []
    }

    // Avoid duplicates
    const exists = skill.value.some((skillid) => skillid.id === skillId)
    if (!exists) {
      subject.value.push({ id: skillId })
      console.log(skillId)
    }
  }
}

const fetchSkillById = (id: string, index: number) => {
  const skill = skillStore.skills.find((sub) => sub.id === id)
  if (skill) {
    return {
      name: skill.name,
      description: skill.description
    }
  }
  return {
    name: refFormSkill.value[index].name,
    description: refFormSkill.value[index].description,
    colorsTag: refFormSkill.value[index].colorsTag
  }
}

watch(
  () => refFormSkill.value.map((f) => f.id),
  (newIds) => {
    newIds.forEach((id, index) => {
      if (id) {
        const skillData = fetchSkillById(id, index)
        Object.assign(refFormSkill.value[index], skillData)
      }
    })
  },
  { deep: true }
)

//*************************************** end skill *************************************************** */
</script>
<template>
  <v-container fluid>
    &nbsp;
    <h2 style="margin-left: 2%; font-size: 24px; margin-bottom: 2%">
      เพิ่มหลักสูตร / เล่มหลักสูตร
    </h2>
    <v-spacer></v-spacer>

    <v-card class="elevation-5" rounded="lg" style="height: auto; min-width: 30vh">
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <v-tabs v-model="tab" direction="vertical">
              <v-tab value="option-1">รายละเอียด</v-tab>
              <v-tab value="option-2">อาจารย์ผู้รับผิดชอบหลักสูตร</v-tab>
              <v-tab value="option-3">ผลการเรียนรู้ที่คาดหวังของหลักสูตร</v-tab>
              <v-tab value="option-4">สกิล</v-tab>
              <v-tab value="option-5">โครงสร้างหลักสูตร รายวิชาและหน่วยกิต</v-tab>
              <v-tab value="option-6">ภาพรวม</v-tab>
            </v-tabs>
          </v-col>
          <v-col>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="option-1">
                <v-container class="mt-2">
                  <div style="display: flex; margin-bottom: 5vh; margin-top: 2vh">
                    <div class="rounded-rectangle"></div>
                    <p class="details-text" style="font-size: 2.5vh">รายละเอียด</p>
                  </div>

                  <v-form ref="form" class="ma-2">
                    <p style="font-size: 1.5vh">ชื่อหลักสูตร</p>
                    <v-text-field
                      v-model="thaiName"
                      :rules="nameRules"
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-text-field>
                    <p style="font-size: 1.5vh">ชื่อหลักสูตร (อังกฤษ)</p>
                    <v-text-field
                      v-model="engName"
                      :rules="nameRules"
                      variant="outlined"
                      rounded="lg"
                    ></v-text-field>
                    <p style="font-size: 1.5vh">รหัสหลักสูตร</p>
                    <v-text-field
                      v-model="id"
                      :rules="nameRules"
                      variant="outlined"
                      rounded="lg"
                    ></v-text-field>
                    <p style="font-size: 1.5vh">ชื่อปริญญา</p>
                    <v-text-field
                      v-model="thaiDegreeName"
                      :rules="nameRules"
                      variant="outlined"
                      rounded="lg"
                    ></v-text-field>
                    <p style="font-size: 1.5vh">ชื่อปริญญา ( อังกฤษ)</p>
                    <v-text-field
                      v-model="engDegreeName"
                      :rules="nameRules"
                      variant="outlined"
                      rounded="lg"
                    ></v-text-field>
                    <p style="font-size: 1.5vh">สาขาวิชา</p>
                    <v-select
                      v-model="select2"
                      :items="branchOptions"
                      variant="outlined"
                      rounded="lg"
                    ></v-select>
                    <v-overlay :model-value="overlay" class="align-center justify-center">
                      <v-progress-circular
                        color="red"
                        size="64"
                        indeterminate
                      ></v-progress-circular>
                    </v-overlay>
                    <v-row class="justify-end mt-4 mb-1">
                      <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn>
                      <v-btn @click="save" variant="plain">บันทึก</v-btn>
                    </v-row>
                  </v-form>
                </v-container>
              </v-tabs-window-item>
              <v-tabs-window-item value="option-2">
                <v-container class="mt-2">
                  <div style="display: flex; margin-bottom: 5vh; margin-top: 2vh">
                    <div class="rounded-rectangle"></div>
                    <p class="details-text" style="font-size: 2.5vh">อาจารย์ผู้รับผิดชอบหลักสูตร</p>
                  </div>
                  <v-form ref="form" class="ma-2">
                    <p style="font-size: 1.5vh">เลือก</p>
                    <v-combobox
                      v-model="select3"
                      :items="userOptions"
                      variant="outlined"
                      rounded="lg"
                      :rules="[(v) => !!v || 'You must agree to continue!']"
                    ></v-combobox>
                    <!-- curriculumStore.currentCurriculum?.coordinators -->

                    <v-card
                      style="border-color: #bdbdbd"
                      variant="outlined"
                      rounded="lg"
                      v-for="(curriculum, index) in coordinator"
                      :key="curriculum.id || index"
                      class="pa-3 mt-3 bg-blue-grey-lighten-5"
                    >
                      <v-row>
                        <v-col>
                          <v-icon color="primary">mdi-numeric-{{ index + 1 }}-circle</v-icon>&nbsp;
                          {{ getUserInfoById(curriculum.id) }}
                        </v-col>
                        <v-col class="d-flex justify-end" cols="auto">
                          <v-btn
                            color="red"
                            variant="text"
                            style="height: auto"
                            class="circular-btn"
                            icon="mdi-minus"
                            @click="removeCoordinator(curriculum.id)"
                          >
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-overlay :model-value="overlay" class="align-center justify-center">
                      <v-progress-circular
                        color="primary"
                        size="64"
                        indeterminate
                      ></v-progress-circular>
                    </v-overlay>
                    <v-row class="justify-center">
                      <v-btn
                        icon="mdi-plus"
                        class="ma-8 rounded-circle"
                        size="40px"
                        variant="outlined"
                        @click="addc"
                      ></v-btn>
                    </v-row>
                    <v-row class="justify-end mt-4 mb-1">
                      <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
                      ><v-btn @click="saveC" variant="plain">บันทึก</v-btn></v-row
                    >
                  </v-form>
                </v-container>
              </v-tabs-window-item>

              <v-tabs-window-item value="option-3">
                <v-container>
                  <div style="display: flex; margin-bottom: 5vh; margin-top: 2vh">
                    <div class="rounded-rectangle"></div>
                    <p class="details-text" style="font-size: 2.5vh">
                      ผลการเรียนรู้ที่คาดหวังของหลักสูตร
                    </p>
                  </div>

                  <v-form ref="form" class="ma-2" v-for="(form, index) in forms" :key="index">
                    <p class="details-text" style="font-size: 2.5vh">{{ form.label }}</p>
                    <br />
                    <p style="font-size: 1.5vh">รายละเอียด</p>
                    <v-textarea
                      v-model="form.description"
                      :rules="nameRules"
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-textarea>
                    <p style="font-size: 1.5vh">ผลลัพธ์การเรียนรู้ ตามมาตรฐาน คุณวุฒิฯ</p>
                    <v-select
                      v-model="form.select5"
                      :items="items4"
                      variant="outlined"
                      rounded="lg"
                    ></v-select>
                  </v-form>
                  <v-row class="justify-center">
                    <v-btn
                      icon="mdi-plus"
                      class="ma-4 rounded-circle"
                      size="40px"
                      variant="outlined"
                      @click="addForm"
                    ></v-btn>
                    <v-btn
                      color="error"
                      icon="mdi-minus"
                      class="ma-4 rounded-circle"
                      size="40px"
                      variant="outlined"
                      @click="removeForm"
                    ></v-btn>
                  </v-row>
                  <v-row class="justify-end mt-8 mb-1">
                    <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
                    ><v-btn @click="saveC" variant="plain">บันทึก</v-btn></v-row
                  >
                </v-container>
              </v-tabs-window-item>

              <v-tabs-window-item value="option-4">
                <v-container>
                  <div style="display: flex; margin-bottom: 5vh; margin-top: 2vh">
                    <div class="rounded-rectangle"></div>
                    <p class="details-text" style="font-size: 2.5vh">สกิล</p>
                  </div>

                  <v-form
                    ref="formSkill"
                    class="ma-2"
                    v-for="(formSkill, index) in refFormSkill"
                    :key="index"
                  >
                    <br />
                    <p
                      class="details-text"
                      style="font-size: 2.5vh; margin: auto; margin-bottom: 1%"
                    >
                      {{ formSkill.label }}
                    </p>
                    <p style="font-size: 1.5vh">รหัสสกิล</p>
                    <v-combobox
                      v-model="formSkill.id"
                      :rules="[(v) => !!v || 'Field is required']"
                      :items="skillId"
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-combobox>
                    <p style="font-size: 1.5vh">ชื่อสกิล</p>
                    <v-text-field
                      v-model="formSkill.name"
                      :rules="nameRules"
                      variant="outlined"
                      rounded="lg"
                    ></v-text-field>

                    <p style="font-size: 1.5vh">คำอธิบายสกิล</p>
                    <v-textarea
                      text
                      v-model="formSkill.description"
                      :rules="[(v) => !!v || 'Field is required']"
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-textarea>
                    <p style="font-size: 1.5vh">สีประจำสกิล</p>

                    <div>
                      <v-menu v-model="menu" :close-on-content-click="false" location="end">
                        <template v-slot:activator="{ props }">
                          <v-btn
                            :color="formSkill.colorsTag || color"
                            v-model="formSkill.colorsTag"
                            v-bind="props"
                          >
                          </v-btn>
                        </template>

                        <v-card min-width="300">
                          <v-list>
                            <v-color-picker show-swatches v-model="color"></v-color-picker>
                            <template v-slot:append>
                              <v-btn
                                :class="fav ? 'text-red' : ''"
                                icon="mdi-heart"
                                variant="text"
                                @click="fav = !fav"
                              ></v-btn>
                            </template>
                          </v-list>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
                            <v-btn color="primary" variant="text" @click="menu = false">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </div>
                  </v-form>
                  <v-row class="justify-center">
                    <v-btn
                      icon="mdi-plus"
                      class="ma-4 rounded-circle"
                      size="40px"
                      variant="outlined"
                      @click="addSkills"
                    ></v-btn>
                    <v-btn
                      color="error"
                      icon="mdi-minus"
                      class="ma-4 rounded-circle"
                      size="40px"
                      variant="outlined"
                      @click="removeFormJ"
                    ></v-btn>
                  </v-row>
                  <v-row class="justify-end mt-8 mb-1">
                    <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
                    ><v-btn @click="saveS" variant="plain">บันทึก</v-btn></v-row
                  >
                </v-container>
              </v-tabs-window-item>

              <v-tabs-window-item value="option-5">
                <v-container>
                  <div style="display: flex; margin-bottom: 5vh; margin-top: 2vh">
                    <div class="rounded-rectangle"></div>
                    <p class="details-text" style="font-size: 2.5vh">
                      โครงสร้างหลักสูตร รายวิชาและหน่วยกิต
                    </p>
                  </div>
                  <v-form
                    ref="formSubjects"
                    class="ma-2"
                    v-for="(formSubjects, index) in refFormSubjects"
                    :key="index"
                  >
                    <br />

                    <p
                      class="details-text"
                      style="font-size: 2.5vh; margin: auto; margin-bottom: 1%"
                    >
                      {{ formSubjects.label }}
                    </p>
                    <p style="font-size: 1.5vh">รหัสรายวิชา</p>

                    <v-combobox
                      v-model="formSubjects.id"
                      :rules="[(v) => !!v || 'Field is required']"
                      :items="subjectsOptions"
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-combobox>
                    <p style="font-size: 1.5vh">ชื่อรายวิชา</p>
                    <v-text-field
                      v-model="formSubjects.thaiName"
                      :rules="[(v) => !!v || 'Field is required']"
                      text
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-text-field>
                    <p style="font-size: 1.5vh">ชื่อรายวิชา(ภาษาอังกฤษ)</p>
                    <v-text-field
                      text
                      v-model="formSubjects.engName"
                      :rules="[(v) => !!v || 'Field is required']"
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-text-field>
                    <p style="font-size: 1.5vh">หน่วยกิต</p>
                    <v-text-field
                      text
                      v-model.number="formSubjects.credit"
                      :rules="[(v) => !!v || 'Field is required']"
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-text-field>
                    <p style="font-size: 1.5vh">จำนวนชั่วโมงเรียน</p>
                    <v-text-field
                      text
                      v-model="formSubjects.studyTime"
                      :rules="[(v) => !!v || 'Field is required']"
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-text-field>
                    <p style="font-size: 1.5vh">คำอธิบายรายวิชา</p>
                    <v-textarea
                      text
                      v-model="formSubjects.description"
                      :rules="[(v) => !!v || 'Field is required']"
                      variant="outlined"
                      rounded="lg"
                      class="small-input"
                    ></v-textarea>
                  </v-form>
                  <v-row class="justify-center">
                    <v-btn
                      icon="mdi-plus"
                      class="ma-4 rounded-circle"
                      size="40px"
                      variant="outlined"
                      @click="addS"
                    ></v-btn>
                    <v-btn
                      color="error"
                      icon="mdi-minus"
                      class="ma-4 rounded-circle"
                      size="40px"
                      variant="outlined"
                      @click="removeFormJ"
                    ></v-btn>
                  </v-row>
                  <v-row class="justify-end mt-8 mb-1">
                    <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
                    ><v-btn @click="saveS" variant="plain">บันทึก</v-btn></v-row
                  >
                </v-container>
              </v-tabs-window-item>

              <v-tabs-window-item value="option-6">
                <v-container class="mt-2">
                  <div style="display: flex; margin-bottom: 5vh; margin-top: 2vh">
                    <div class="rounded-rectangle"></div>
                    <p class="details-text" style="font-size: 2.5vh">ภาพรวม</p>
                  </div>

                  <p
                    style="
                      font-size: 18px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <span
                      >ชื่อหลักสูตร : &nbsp;{{ thaiName
                      }}<span style="color: red" v-if="engName == ''">ไม่มี</span></span
                    >
                    <v-icon size="20px" @click="tab = 'option-1'">mdi-pencil</v-icon>
                  </p>
                  &nbsp;
                  <p style="font-size: 18px">
                    ชื่อหลักสูตร (อังกฤษ) : &nbsp;{{ engName
                    }}<span style="color: red" v-if="engName == ''">ไม่มี</span>
                  </p>
                  &nbsp;
                  <p style="font-size: 18px">
                    รหัสหลักสูตร : &nbsp;{{ id
                    }}<span style="color: red" v-if="engName == ''">ไม่มี</span>
                  </p>
                  &nbsp;
                  <p style="font-size: 18px">
                    ชื่อปริญญา : &nbsp;{{ thaiDegreeName
                    }}<span style="color: red" v-if="engName == ''">ไม่มี</span>
                  </p>
                  &nbsp;
                  <p style="font-size: 18px">
                    ชื่อปริญญา ( อังกฤษ) : &nbsp;{{ engDegreeName
                    }}<span style="color: red" v-if="engName == ''">ไม่มี</span>
                  </p>
                  &nbsp;
                  <p style="font-size: 18px">
                    สาขาวิชา : &nbsp;{{ select2
                    }}<span style="color: red" v-if="engName == ''">ไม่มี</span>
                  </p>
                  &nbsp;
                  <p
                    style="
                      font-size: 18px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <span>รายชื่อผู้ดูแลหลักสูตร :</span>
                    <v-icon size="20px" @click="tab = 'option-2'">mdi-pencil</v-icon>
                  </p>
                  &nbsp;
                  <div v-if="coordinator && coordinator.length">
                    <p
                      v-for="(curriculum, index) in coordinator"
                      :key="curriculum.id || index"
                      style="font-size: 18px"
                      class="ml-8"
                    >
                      ผู้ดูแลคนที่ {{ index + 1 }} : &nbsp;{{ getUserInfoById(curriculum.id) }}
                    </p>
                  </div>

                  <div v-else>
                    <p class="ml-8" style="color: red">ไม่มี</p>
                  </div>

                  &nbsp;
                  <p
                    style="
                      font-size: 18px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <span>ผลการเรียนรู้ที่คาดหวังของหลักสูตร :</span>
                    <v-icon size="20px" @click="tab = 'option-3'">mdi-pencil</v-icon>
                  </p>

                  <div>
                    <div v-if="forms.length && forms[0].description">
                      <div
                        v-for="(item, index) in forms"
                        :key="index"
                        class="ml-8"
                        style="font-size: 18px"
                      >
                        &nbsp;
                        <p>{{ item.label }}</p>
                        <p>รายละเอียด : &nbsp;{{ item.description }}</p>
                        <p>ผลลัพธ์การเรียนรู้ ตามมาตรฐาน คุณวุฒิฯ : &nbsp;{{ item.select5 }}</p>
                        <v-divider class="mt-8"></v-divider>
                      </div>
                    </div>

                    <div v-else>
                      &nbsp;
                      <p class="ml-8" style="color: red">ไม่มี</p>
                    </div>
                  </div>
                  &nbsp;
                  <p
                    style="
                      font-size: 18px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <span>สกิลทั้งหมดของหลักสูตร :</span>
                    <v-icon size="20px" @click="tab = 'option-3'">mdi-pencil</v-icon>
                  </p>

                  <div>
                    <div v-if="forms.length && forms[0].description">
                      <div
                        v-for="(item, index) in forms"
                        :key="index"
                        class="ml-8"
                        style="font-size: 18px"
                      >
                        &nbsp;
                        <p>{{ item.label }}</p>
                        <p>รายละเอียด : &nbsp;{{ item.description }}</p>
                        <p>ผลลัพธ์การเรียนรู้ ตามมาตรฐาน คุณวุฒิฯ : &nbsp;{{ item.select5 }}</p>
                        <v-divider class="mt-8"></v-divider>
                      </div>
                    </div>

                    <div v-else>
                      &nbsp;
                      <p class="ml-8" style="color: red">ไม่มี</p>
                    </div>
                  </div>
                  &nbsp;
                  <p
                    style="
                      font-size: 18px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <span>โครงสร้างหลักสูตร รายวิชาและหน่วยกิต :</span>
                    <v-icon size="20px" @click="tab = 'option-4'">mdi-pencil</v-icon>
                  </p>

                  <div v-if="refFormSubjects.length && refFormSubjects[0].description">
                    <div
                      v-for="(item, index) in refFormSubjects"
                      :key="index"
                      class="ml-8"
                      style="font-size: 18px"
                    >
                      &nbsp;
                      <p>{{ item.label }}</p>
                      &nbsp;
                      <p>รหัสวิชา : &nbsp;{{ item.id }}</p>
                      <p>ชื่อวิชา : &nbsp;{{ item.thaiName }}</p>

                      <v-divider class="mt-8"></v-divider>
                    </div>
                  </div>
                  <div v-else>
                    &nbsp;
                    <p class="ml-8" style="color: red">ไม่มี</p>
                  </div>
                  <v-row class="justify-end mt-8 mb-1">
                    <v-btn @click="over" variant="plain">ยืนยัน</v-btn></v-row
                  >
                </v-container>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
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
.rounded-rectangle {
  width: 1vh; /* Adjust the width as needed */
  height: 3.5vh; /* Adjust the height as needed */
  background-color: #392fc5; /* Background color of the rectangle */
  border-top-left-radius: 50px; /* Adjust the radius as needed */
  border-top-right-radius: 50px; /* Adjust the radius as needed */
  border-bottom-left-radius: 50px; /* Adjust the radius as needed */
  border-bottom-right-radius: 50px; /* Adjust the radius as needed */
}
</style>
