<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
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
const select5 = ref<string | null>(null)
const items1 = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const items2 = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const items4 = ref<string[]>(['ความรู้', 'ทักษะ', 'จริยธรรม', 'ลักษณะบุคคล'])
const items3 = ref<string[]>(['นาย', 'นางสาว', 'นางสาว'])
const form = ref<VForm | null>(null)
const forms = ref([{ label: 'Plo1', description: '', select5: null }])
type userIds = { id: string }

onMounted(async () => {
  await branchStore.getBranches()
  curriculumStore.fetchCurriculums()
  await userStore.fetchUsers()
  const coordinators = curriculumStore.currentCurriculum?.coordinators
})

watch(overlay, (val) => {
  if (val) {
    setTimeout(() => {
      overlay.value = false
    }, 2000)
  }
})

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

//***************************************coordinator*************************************************** */

const coordinator = ref<userIds[]>(
  (curriculumStore.currentCurriculum?.coordinators ?? [])
    .filter((coord) => coord.id !== null) // Filter out items where id is null
    .map((coord) => ({
      id: coord.id!.toString() // Use non-null assertion operator
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
      // Log request URL and payload
      console.log(
        `Sending request to: /curriculums/${curriculumStore.editedCurriculum.id}/coordinators`
      )
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

watch(
  () => curriculumStore.currentCurriculum,
  (newCurriculum) => {
    if (newCurriculum) {
      id.value = newCurriculum.id
      thaiName.value = newCurriculum.thaiName
      engName.value = newCurriculum.engName
      select1.value = newCurriculum.thaiDegreeName
      engDegreeName.value = newCurriculum.engDegreeName
      select2.value = `${(newCurriculum.branch as any).id} ${(newCurriculum.branch as any).name}`

      console.log(newCurriculum)
    } else {
      id.value = ''
      thaiName.value = ''
      engName.value = ''
      thaiDegreeName.value = ''
      engDegreeName.value = ''
      select2.value = ''
    }
  },
  { immediate: true }
)

async function save() {
  const { valid } = await form.value!.validate()
  if (!valid) return
  curriculumStore.editedCurriculum.thaiName = thaiName.value
  curriculumStore.editedCurriculum.engName = engName.value
  curriculumStore.editedCurriculum.id = id.value
  curriculumStore.editedCurriculum.thaiDegreeName = select1.value ?? ''
  curriculumStore.editedCurriculum.engDegreeName = engDegreeName.value
  curriculumStore.editedCurriculum.description = ''
  curriculumStore.editedCurriculum.period = '4 ปี'
  curriculumStore.editedCurriculum.branch = select2.value.substring(0, select2.value.indexOf(' '))
  curriculumStore.editedCurriculum.minimumGrade = 0
  overlay.value = !overlay.value
  await curriculumStore.saveCurriculum()
}

const branchOptions = computed(() => {
  return branches.value.map((branch) => {
    return `${branch.id} ${branch.name}`
  })
})

function addForm() {}
function removeForm() {}
//*************************************** end curriculums *************************************************** */

const detailsSection = ref<HTMLElement | null>(null)

const scrollToElement = () => {
  if (detailsSection.value) {
    detailsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
<template>
  <v-container>
    &nbsp;
    <h2 style="margin-left: 2%; font-size: 24px; margin-bottom: 2%">
      เพิ่มหลักสูตร / เล่มหลักสูตร
    </h2>
    <v-spacer></v-spacer>

    <v-row>
      <!-- Form Section -->
      <v-col cols="12" md="4">
        <v-container class="d-flex" style="max-width: 700px">
          <v-card class="elevation-5" rounded="lg" max-width="700px" width="700px">
            <p class="ma-5" style="font-size: large">
              <v-icon left size="xx-small" class="mr-2" color="#112f69">mdi-circle</v-icon
              >เนื้อหาหลักสูตร
            </p>
            <v-card-actions v-if="!reveal2" @click="validate2">
              <p class="ma-2" style="font-size: small">รายละเอียด</p>
              <v-spacer></v-spacer>
            </v-card-actions>

            <v-card-actions v-if="!reveal" @click="scrollToElement">
              <p class="ma-2" style="font-size: small">อาจารย์ผู้รับผิดชอบหลักสูตร</p>
              <v-spacer></v-spacer>
            </v-card-actions>

            <v-card-actions v-if="!reveal3" @click="validate3">
              <p class="ma-2" style="font-size: small">ผลการเรียนรู้ที่คาดหวังของหลักสูตร</p>
              <v-spacer></v-spacer>
            </v-card-actions>

            <v-card-actions>
              <p class="ma-2" style="font-size: small">การจัดกระบวนการเรียนรู้</p>
              <v-spacer></v-spacer>
            </v-card-actions>

            <v-card-actions>
              <p class="ma-2" style="font-size: small">โครงสร้างหลักสูตร รายวิชาและหน่วยกิต</p>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card> </v-container
      ></v-col>
      <v-col md="8">
        <v-card
          class="elevation-5 ma-3"
          rounded="lg"
          style="height: auto; max-width: 1000px; min-width: 30vh"
        >
          <v-container>
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
                v-model="select1"
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
                <v-progress-circular color="red" size="64" indeterminate></v-progress-circular>
              </v-overlay>
              <v-row class="justify-end">
                <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn>
                <v-btn @click="save" variant="plain">บันทึก</v-btn>
              </v-row>
            </v-form>
          </v-container>
          <v-divider class="mx-4 mb-1"></v-divider>

          <v-container>
            <div style="display: flex; margin-bottom: 5vh; margin-top: 2vh" ref="detailsSection">
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
                <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
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
              <v-row class="justify-end mt-8">
                <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
                ><v-btn @click="saveC" variant="plain">บันทึก</v-btn></v-row
              >
            </v-form>
          </v-container>
          <v-divider class="mx-4 mb-1"></v-divider>

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
              <v-text-field
                v-model="form.description"
                :rules="nameRules"
                variant="outlined"
                rounded="lg"
                class="small-input"
              ></v-text-field>
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
            <v-row class="justify-end mt-8">
              <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
              ><v-btn @click="saveC" variant="plain">บันทึก</v-btn></v-row
            >
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.details-text {
  margin-left: 10px;
  /* Adjust the spacing between the div and p as needed */
  font-weight: bold;
  font-size: large;
}

.custom-header {
  background-color: #2d487e;
  /* Blue header color */
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
  width: 1vh;
  /* Adjust the width as needed */
  height: 3.5vh;
  /* Adjust the height as needed */
  background-color: #392fc5;
  /* Background color of the rectangle */
  border-top-left-radius: 50px;
  /* Adjust the radius as needed */
  border-top-right-radius: 50px;
  /* Adjust the radius as needed */
  border-bottom-left-radius: 50px;
  /* Adjust the radius as needed */
  border-bottom-right-radius: 50px;
  /* Adjust the radius as needed */
}
</style>
