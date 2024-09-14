<script setup lang="ts">
import { useSubjectStore } from '@/stores/subject'
import { useUserStore } from '@/stores/user'
import type { Subject } from '@/types/Subjects'
import type { User } from '@/types/User'
import { computed, nextTick, onMounted, ref } from 'vue'
import type { VForm } from 'vuetify/components'
import type { PageParams, SortItem } from '@/types/PageParams'
import FormDialog from '@/views/subjects/SubjectFormDialog.vue'
import SearchTextfield from '@/components/table/SearchTextfield.vue'
import AddButton from '@/components/AddButton.vue'

const subjects = computed(() => subjectStore.subjects)
const subjectStore = useSubjectStore()
const editedSubject = ref(Object.assign({}, subjectStore.initialSubject))
const dialog = ref(false)
const dialogDelete = ref(false)
const refForm = ref<VForm | null>(null)
const loading = ref(false)
const isUpdate = ref(false)
const isCreate = ref(false)
onMounted(async () => {
  fetchSubjects()
  console.log(subjectStore.totalSubjects)
})
const headers = [
  { title: 'รหัสรายวิชา', key: 'id', value: 'id' },
  { title: 'ชื่อรายวิชา', key: 'thaiName', value: 'thaiName' },
  { title: 'ชื่อรายวิชาภาษาอังกฤษ', key: 'engName', value: 'engName' },
  { title: 'จำนวนหน่วยกิต', key: 'credit', value: 'credit' },
  { title: 'จำนวนเวลาเรียน', key: 'studyTime', value: 'studyTime' }
]
const fetchSubjects = async (search?: string) => {
  loading.value = true
  if (search) {
    pageParams.value.search = search
    console.log(pageParams.value.search)
  } else {
    pageParams.value.search = ''
  }
  console.log(pageParams.value.search)
  try {
    await subjectStore.fetchSubjectsPage(pageParams.value)
  } catch (error) {
    console.error('Error fetching subjects:', error)
  } finally {
    loading.value = false
  }
  // loading.value = true
  // try {
  //     await subjectStore.fetchSubjects(pageParams.value)
  // } catch (error) {
  //     console.error('Error fetching users:', error)
  // } finally {
  //     loading.value = false
  // }
}
const addSubject = () => {
  isCreate.value = true
  dialog.value = true
}

// async function save() {
//     console.log(subjectStore.editedSubject)
//     console.log(refForm.value)
//     const { valid } = await refForm.value!.validate()
//     if (!valid) return
//     closeDialog()
//     await subjectStore.saveSubject(pageParams.value)
// }
const save = async (subject: Subject) => {
  subjectStore.editedSubject = subject
  if (isUpdate.value) {
    await subjectStore.updateSubject()
  } else {
    await subjectStore.saveSubject(pageParams.value)
  }
  isUpdate.value = false
  subjectStore.clearForm()
  fetchSubjects()
  closeDialog()
  dialog.value = false
}
// function closeDialog() {
//     dialog.value = false
//     nextTick(() => {
//         subjectStore.clearForm()
//     })
// }
const closeDialog = () => {
  subjectStore.clearForm()
  editedSubject.value = Object.assign({}, subjectStore.initialSubject)
  dialog.value = false
  isCreate.value = false
  isUpdate.value = false
}
// const editItem = async (subject: Subject) => {
//     console.log(subject)
//     dialog.value = true
//     await subjectStore.fetchSubject(subject.id)
//     if (editedSubject.value.id) {
//         isUpdate.value = true
//         dialog.value = true
//     }
// }
const editItem = (subject: Subject) => {
  editedSubject.value = { ...subject } // work with a temporary copy of editedUser.value *******************

  if (editedSubject.value.id) {
    isUpdate.value = true
    dialog.value = true
  }
}
async function deleteItem(subject: Subject) {
  console.log(subject)
  await subjectStore.fetchSubject(subject.id)
  dialogDelete.value = true
  // editedIndex = -1
}
function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    subjectStore.clearForm()
  })
}

async function deleteItemConfirm() {
  await subjectStore.deleteSubject(pageParams.value)
  closeDelete()
}
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: ''
})
const sortBy = ref<SortItem[]>([{ key: 'id', order: 'asc' }])

const updateOptions = (options: any) => {
  //sorting
  if (options.sortBy.length === 0) {
    // Set default sort when sortBy is empty
    sortBy.value = [{ key: 'id', order: 'asc' }]
  } else {
    // Update sortBy and sortDesc based on user selection
    sortBy.value = options.sortBy
  }
  // toUpperCase
  pageParams.value.sort = sortBy.value[0].key
  if (sortBy.value[0].order === 'desc') {
    pageParams.value.order = 'DESC'
  } else {
    pageParams.value.order = 'ASC'
  }

  // current page
  pageParams.value.page = options.page
  // item per page
  pageParams.value.limit = options.itemsPerPage
  // fetchSubject
  fetchSubjects()
}
</script>
<template>
  <v-container fluid>
    <h2 style="font-size: 24px" class="pa-5">รายวิชา</h2>

    <v-row class="d-flex justify-end ga-5" no-gutters>
      <v-col class="d-flex justify-end flex-grow-1">
        <SearchData
          style="min-width: 250px"
          :label="'ค้นหารายวิชา'"
          :search="pageParams.search"
          :fetch-data="fetchSubjects"
        ></SearchData>
      </v-col>
      <v-col class="d-flex justify-end flex-grow-0">
        <!-- <AddButton style="width: 300px" :to-link="null" :label="'เพิ่มรายวิชา'" to="/AddSubject">
                </AddButton> -->
        <AddButton
          style="width: 300px"
          :to-link="null"
          :label="'เพิ่มรายวิชา'"
          :clickFucntion="addSubject"
        >
        </AddButton>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-card class="mt-4">
          <div>
            <v-data-table-server
              v-model:items-per-page="pageParams.limit"
              :headers="headers"
              :items="subjectStore.subjects"
              :items-length="subjectStore.totalSubjects"
              :loading="loading"
              item-value="id"
              class="bg-primary"
              @update:options="updateOptions"
            >
              <template v-slot:item="{ item, index }">
                <tr :class="[{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }]">
                  <td style="min-width: 130px">{{ item.id }}</td>
                  <td style="min-width: 220px">{{ item.thaiName }}</td>
                  <td style="min-width: 220px">{{ item.engName }}</td>
                  <td style="min-width: 180px">{{ item.credit }}</td>
                  <td style="min-width: 180px">{{ item.studyTime }}</td>
                  <td style="text-align: left; min-width: 90px; padding-left: 40px">
                    <v-icon primary small @click="editItem(item)"
                      >mdi-file-document-edit-outline</v-icon
                    >
                    <!-- <v-icon primary small @click="deleteItem(item)">mdi-delete</v-icon> -->
                  </td>
                </tr>
              </template>
            </v-data-table-server>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog max-width="1200px" v-model="dialog" persistent>
    <FormDialog
      :item="editedSubject"
      :method="save"
      :isUpdate="isUpdate"
      @close-dialog="closeDialog"
    ></FormDialog>
  </v-dialog>
</template>
<!-- <template>
    <div>{{ console.log(headers) }}</div>
    <v-container>
        <v-card>
            <v-responsive>
                <v-data-table-server v-model:items-per-page="pageParams.limit" :headers="headers" :items="subjects"
                    :style="{ width: '2000px', padding: '50px' }" class="elevation-1 styled-table" show-expand
                    :items-length="subjectStore.totalSubjects" :loading="loading" @update:options="updateOptions"
                    :class="rounded - table">
                    <template v-slot:item.actions="{ item }">
                        <v-icon size="small" class="mr-2 edit-icon" @click="editItem(item)"> mdi-pencil</v-icon>
                        <v-icon size="small" class="mr-2 delete-icon" @click="deleteItem(item)">mdi-delete</v-icon>
                    </template>
                    <template v-slot:top>
                        <v-toolbar color="white">
                            <v-toolbar-title>รายวิชา</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="600px">
                                <template v-slot:activator="{ props }">
                                    <v-text-field v-model="pageParams.search" label="Search" @input="fetchSubjects"
                                        class="mx-4" prepend-inner-icon="mdi-magnify" clearable density="compact"
                                        single-line flat hide-details variant="solo-filled"></v-text-field>

                                    <v-btn color="blue" dark v-bind="props">เพิ่มรายวิชา</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }}</span>
                                        เพิ่ม/แก้ไขรายวิชา
                                    </v-card-title>

                                    <v-card-text>
                                        <v-form ref="refForm">
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="subjectStore.editedSubject.id"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="รหัสรายวิชา"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="subjectStore.editedSubject.thaiName"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label=" ชื่อรายวิชา"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="subjectStore.editedSubject.engName"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="ชื่อรายวิชา(ภาษาอังกฤษ)"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="6">
                                                        <v-text-field v-model.number="subjectStore.editedSubject.credit"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="หน่วยกิต"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="6">
                                                        <v-text-field v-model="subjectStore.editedSubject.studyTime"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="จำนวนชั่วโมงเรียน"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-textarea v-model="subjectStore.editedSubject.description"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="คำอธิบายรายวิชา"></v-textarea>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-form>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="save()">
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>

                    <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                            Course Description
                        </tr>
                        <tr>
                            <td :colspan="columns.length">
                                {{ item.description }}
                            </td>
                        </tr>
                    </template>
                </v-data-table-server>
            </v-responsive>
        </v-card>
    </v-container>
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template> -->
<!-- <template>
    <div>{{ console.log(headers) }}</div>

    <v-data-table :headers="headers" :items="subjects">
        <template v-slot:item.actions="{ item }">
            <v-icon size="small" @click="editItem(item)"> mdi-pencil</v-icon>
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>รายวิชา</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
            </v-toolbar>
        </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
                New Item
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
                เพิ่ม/แก้ไขรายวิชา
            </v-card-title>

            <v-card-text>
                <v-form ref="refForm">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="subjectStore.editedSubject.id"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="รหัสรายวิชา"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="subjectStore.editedSubject.thaiName"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label=" ชื่อรายวิชา"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="subjectStore.editedSubject.engName"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="ชื่อรายวิชา(ภาษาอังกฤษ)"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model.number="subjectStore.editedSubject.credit"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="หน่วยกิต"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="subjectStore.editedSubject.studyTime"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="จำนวนชั่วโมงเรียน"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-textarea v-model="subjectStore.editedSubject.description"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="คำอธิบายรายวิชา"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            
<v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
                    Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save()">
                    Save
                </v-btn>
            </v-card-actions>
</v-card>
</v-dialog>
<v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template> -->
<style scoped>
.details-text {
  margin-left: 10px;
  /* Adjust the spacing between the div and p as needed */
  font-weight: bold;
  font-size: large;
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

/* Custom table styles */
.custom-table td {
  border: none;
  /* Remove border between columns */
  height: 55px;
}
</style>
