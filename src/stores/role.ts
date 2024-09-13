import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import roleService from '@/service/role'
import type { Role } from '@/types/Role'

export const useRoleStore = defineStore('role', () => {
  const roles = ref<Role[]>([])
  const initialRole: Role = {
    name: ''
  }
  const editedRole = ref<Role>(JSON.parse(JSON.stringify(initialRole)))

  async function getRole(id: number) {
    const res = await roleService.getRole(id)
    editedRole.value = res.data
  }
  async function getRoles() {
    const res = await roleService.getRoles()
    // console.log(res.data)
    roles.value = res.data
  }
  async function saveRole() {
    const role = editedRole.value
    if (!role.id) {
      // Add new
      console.log('Post ' + JSON.stringify(role))
      const res = await roleService.addRole(role)
    } else {
      // Update
      console.log('Patch ' + JSON.stringify(role))
      const res = await roleService.updateRole(role)
    }

    await getRoles()
  }
  async function deleteRole() {
    const role = editedRole.value
    const res = await roleService.delRole(role)
    await getRoles()
  }

  function clearForm() {
    editedRole.value = JSON.parse(JSON.stringify(initialRole))
  }
  return { roles, getRoles, saveRole, deleteRole, editedRole, getRole, clearForm }
})
