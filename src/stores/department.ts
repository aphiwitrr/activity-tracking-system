import { ref } from 'vue';
import { defineStore } from 'pinia';
import departmentService from '@/service/department';
import type { Department } from '@/types/Department';

export const useDepartmentStore = defineStore('department', () => {
  const departments = ref<Department[]>([]);
  const initialDepartment: Department = {
    id: '',
    name: '',
    branches: [],
    faculty: []
  };
  const editedDepartment = ref<Department>(JSON.parse(JSON.stringify(initialDepartment)));

  async function getDepartment(id: string) {
    const res = await departmentService.getDepartment(id);
    editedDepartment.value = res.data;
  }

  async function getDepartments() {
    const res = await departmentService.getDepartments();
    departments.value = res.data;
  }

  async function saveDepartment() {
    const department = editedDepartment.value;
    if (!department.id) {
      // Add new
      console.log('Post ' + JSON.stringify(department));
      await departmentService.addDepartment(department);
    } else {
      // Update
      console.log('Patch ' + JSON.stringify(department));
      await departmentService.updateDepartment(department);
    }

    await getDepartments();
  }

  async function deleteDepartment() {
    const department = editedDepartment.value;
    await departmentService.delDepartment(department);
    await getDepartments();
  }

  function clearForm() {
    editedDepartment.value = JSON.parse(JSON.stringify(initialDepartment));
  }

  return {
    departments,
    getDepartments,
    saveDepartment,
    deleteDepartment,
    editedDepartment,
    getDepartment,
    clearForm
  };
});