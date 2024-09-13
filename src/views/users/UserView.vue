<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useRoleStore } from '@/stores/role'
import type { User } from '@/types/User'
import type { PageParams, SortItem } from '@/types/PageParams'
import FormDialog from '@/views/users/UserFormDialog.vue'
import MainTable from '@/components/table/MainTable.vue'
import { useLocale } from 'vuetify'
// import SearchData from '@/components/SearchData.vue'
import AddButton from '@/components/AddButton.vue'
import SelectBy from '@/components/SelectByFeature.vue'

const userStore = useUserStore()
const roleStore = useRoleStore()
const { t } = useLocale()

const headers = computed(() => [
  { title: t('uid'), value: 'id', key: 'id', sortable: false },
  { title: t('email'), value: 'email', key: 'email', sortable: false },
  { title: t('first name'), value: 'firstName', key: 'firstName', sortable: false },
  { title: t('last name'), value: 'lastName', key: 'lastName', sortable: false },
  // { title: 'เพศ', value: 'gender' },
  // { title: 'เบอร์โทรศัพท์', value: 'phone' },
  { title: t('position'), value: 'roles', key: 'roles', sortable: false }
])

const dialog = ref(false)
const editedUser = ref(Object.assign({}, userStore.initialUser))
const isUpdate = ref(false)
const isCreate = ref(false)
const selectedRoles = ref()
const loading = ref(false)
const sortBy = ref<SortItem[]>([{ key: 'id', order: 'asc' }])
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: '',
  columnId: '',
  columnName: ''
})

const fetchUsers = async (search?: string, columnId?: string, columnName?: string) => {
  loading.value = true
  if (search !== '' && search) {
    pageParams.value.search = search
  } else {
    pageParams.value.search = ''
  }
  if (columnId && columnName) {
    pageParams.value.columnId = columnId
    pageParams.value.columnName = columnName
  } else {
    pageParams.value.columnId = ''
    pageParams.value.columnName = ''
  }

  console.log(pageParams)
  try {
    await userStore.fetchUsersPage(pageParams.value)
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

const editUser = (user: User) => {
  editedUser.value = { ...user } // work with a temporary copy of editedUser.value *******************
  selectedRoles.value = userStore.editedUser.roles
    ? userStore.editedUser.roles.map((role) => role.id)
    : []

  if (editedUser.value.id) {
    isUpdate.value = true
    dialog.value = true
  }
}

const deleteUser = async (id: string) => {
  await userStore.deleteUser(id)
}

const addUser = () => {
  isCreate.value = true
  dialog.value = true
}

const saveUser = async (user: User) => {
  userStore.editedUser = user

  if (isUpdate.value) {
    await userStore.updateUser()
  } else {
    await userStore.saveUser()
  }
  isUpdate.value = false
  userStore.clearForm()
  fetchUsers()
  closeDialog()
  dialog.value = false
}

const closeDialog = () => {
  userStore.clearForm()
  editedUser.value = Object.assign({}, userStore.initialUser)
  dialog.value = false
  isCreate.value = false
  isUpdate.value = false
}

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
  // fetchUser
  fetchUsers()
}

onMounted(async () => {
  await roleStore.getRoles()
  await fetchUsers()
  console.log(userStore.users)
  console.log(userStore.totalUsers)
})
</script>

<template>
  <v-container fluid>
    &nbsp;
    <h2 style="margin-left: 2%; font-size: 24px; margin-bottom: 2%">รายชื่อผู้ใช้งาน</h2>

    <v-row class="d-flex justify-end ga-5" no-gutters>
      <v-col class="d-flex justify-end flex-grow-1">
        <SearchData
          :search="pageParams.search"
          :label="'ค้นหาผู้ใช้'"
          :fetch-data="fetchUsers"
        ></SearchData>
      </v-col>
      <v-col>
        <SelectBy :fetch-data="fetchUsers" :by-branch="true" :by-curriculum="true"></SelectBy>
      </v-col>
      <v-col class="d-flex justify-end flex-grow-0">
        <AddButton
          style="width: 300px"
          :to-link="null"
          :label="'เพิ่มข้อมูลผู้ใช้'"
          :clickFucntion="addUser"
        ></AddButton>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-card class="mt-4">
          <div>
            <v-data-table-server
              v-model:items-per-page="pageParams.limit"
              :headers="headers"
              :items="userStore.users"
              :items-length="userStore.totalUsers"
              :loading="loading"
              item-value="name"
              class="bg-primary"
              @update:options="updateOptions"
            >
              <template v-slot:item="{ item, index }">
                <tr :class="[{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }]">
                  <td style="min-width: 130px">{{ item.id }}</td>
                  <td style="min-width: 220px">{{ item.email }}</td>
                  <td style="min-width: 180px">{{ item.firstName }}</td>
                  <td style="min-width: 180px">{{ item.lastName }}</td>
                  <!-- <td style="min-width: 120px">{{ item.gender }}</td> -->
                  <!-- <td style="min-width: 150px">{{ item.phone }}</td> -->
                  <td>
                    <v-chip-group>
                      <v-chip v-for="role in item.roles" :key="role.id">
                        {{ role.name }}
                      </v-chip>
                    </v-chip-group>
                  </td>
                  <td style="text-align: left; min-width: 90px; padding-left: 40px">
                    <v-icon primary small @click="editUser(item)"
                      >mdi-file-document-edit-outline</v-icon
                    >
                    <!-- <v-icon small @click="deleteUser(item.id!)">mdi-delete</v-icon> -->
                  </td>
                </tr>
              </template>
            </v-data-table-server>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <Pagination
              :current-page="pageParams.page"
              :items-per-page="pageParams.limit"
              :total-items="userStore.totalUsers"
              v-model="pageParams.page"
              :max-pages-shown="3"
              @click="clickHandler"
            ></Pagination>
          </v-col>
        </v-row>
      </v-card>

      <v-dialog max-width="1000px" persistent v-model="dialog">
        <FormDialog
          :item="editedUser"
          :method="saveUser"
          :isUpdate="isUpdate"
          :roles="roleStore.roles"
          @close-dialog="closeDialog"
        ></FormDialog>
      </v-dialog>
    </v-card>
      </v-col>
    </v-row> -->
    <MainTable
      page-icon="mdi-account-group"
      :page-title="t('list user')"
      :items="userStore.users"
      :headers="headers"
      :fetchSearch="fetchUsers"
      :fetchFab="fetchUsers"
      :btnAddAction="addUser"
      :action="editUser"
      customCol="roles"
    >
      <template #roles="{ item }">
        <v-chip>
          {{ item.roles.map((n: any) => n.name)[0] }}
        </v-chip>
      </template>
    </MainTable>
  </v-container>
  <v-dialog max-width="1000px" v-model="dialog" persistent>
    <FormDialog
      :item="editedUser"
      :method="saveUser"
      :isUpdate="isUpdate"
      :roles="roleStore.roles"
      @close-dialog="closeDialog"
    ></FormDialog>
  </v-dialog>
</template>
<style scoped>
.details-text {
  margin-left: 10px; /* Adjust the spacing between the div and p as needed */
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
  border: none; /* Remove border between columns */
  height: 55px;
}

/* .icon-container {
  display: flex;
  align-items: center;
}

.icon-container > * {
  margin-right: 8px;

} */

/* .pagination-container {
  column-gap: 5px;
}
.paginate-buttons {
  height: 35px;
  width: 50px;
  border-radius: 15px;
  background-color: #2d487e;

  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 600;
}
.paginate-buttons:hover {
  background-color: #4a5670;
}
.active-page {
  border: 1.5px solid #2d487e;
  background-color: #ffffff;
  color: #2d487e;
}
.active-page:hover {
  background-color: #ffffff;
} */
/* Pagination Mobile responsive styling */
/* @media (max-width: 600px) {
  .pagination-container {
    column-gap: 2px;
  }

  .paginate-buttons {
    height: 25px;
    width: 35px;
    font-size: 10px;
  }

  .active-page {
    height: 30px;
    width: 40px;
    font-size: 10px;
  }
} */
</style>
