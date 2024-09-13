import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Faculty } from '@/types/Faculty'
import facultyService from '@/service/faculty'

export const useFacultyStore = defineStore('faculty', () => {
  const faculties = ref<Faculty[]>([])
  const currentFaculty = ref<Faculty | null>(null)

  const initialFaculty: Faculty = {
    id: '',
    name: '',
    branches: [],
    departments: []
  }

  const editedFaculty = ref<Faculty>({ ...initialFaculty })

  function setCurrentFaculty(faculty: Faculty) {
    currentFaculty.value = faculty
  }

  function clearCurrentFaculty() {
    currentFaculty.value = null
  }

  const addFaculty = (faculty: Faculty) => {
    faculties.value.push(faculty)
  }

  async function fetchFaculty(id: string) {
    const res = await facultyService.getFaculty(id)
    editedFaculty.value = res.data
  }

  async function fetchFaculties() {
    const res = await facultyService.getfaculties()
    faculties.value = res.data
  }

  async function fetchBranchIds() {
    const res = await facultyService.getBranchIds()
    return res.data
  }

  async function saveFaculty() {
    const faculty = editedFaculty.value
    await facultyService.addFaculty(faculty)
  }

  async function updateFaculty() {
    const faculty = editedFaculty.value
    await facultyService.updateFaculty(faculty)
  }

  async function deleteFaculty(id: string) {
    await facultyService.delFaculty(id)
    await fetchFaculties()
  }

  function clearForm() {
    editedFaculty.value = { ...initialFaculty }
  }

  return {
    addFaculty,
    faculties,
    currentFaculty,
    clearCurrentFaculty,
    fetchFaculty,
    fetchFaculties,
    saveFaculty,
    updateFaculty,
    deleteFaculty,
    editedFaculty,
    clearForm,
    setCurrentFaculty,
    fetchBranchIds
  }
})
