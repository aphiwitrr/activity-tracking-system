import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Curriculum } from '@/types/Curriculums'
import curriculumService from '@/service/curriculums'
import type { PageParams } from '@/types/PageParams'
export const useCurriculumStore = defineStore('curriculum', () => {
  const curriculums = ref<Curriculum[]>([])
  const currentCurriculum = ref<Curriculum | null>(null)
  const totalCurriculums = ref(0)
  const initialCurriculum: Curriculum = {
    id: '',
    thaiName: '',
    engName: '',
    thaiDegreeName: '',
    engDegreeName: '',
    description: '',
    coordinators: [],
    period: '',
    minimumGrade: 0,
    branch: [],
    plos: []
  }

  const editedCurriculum = ref<Curriculum>({ ...initialCurriculum })

  async function setCurrentCurriculum(id: string) {
    const res = await curriculumService.getCurriculum(id)
    editedCurriculum.value = res.data
    currentCurriculum.value = editedCurriculum.value
    console.log(currentCurriculum.value)
  }

  function clearCurrentCurriculum() {
    currentCurriculum.value = null
  }

  const addCurriculum = (curriculum: Curriculum) => {
    curriculums.value.push(curriculum)
  }

  async function fetchCurriculum(id: string) {
    const res = await curriculumService.getCurriculum(id)
    editedCurriculum.value = res.data
  }

  async function fetchCurriculums() {
    const res = await curriculumService.getCurriculums()
    curriculums.value = res.data
  }
  async function fetchCurriculumsPage(params: PageParams) {
    const res = await curriculumService.getCurriculumsByPage(params)
    curriculums.value = res.data.data
    totalCurriculums.value = res.data.total
  }

  async function saveCurriculum() {
    const curriculum = editedCurriculum.value
    await curriculumService.addCurriculum(curriculum)
  }

  async function updateCurriculum() {
    const curriculum = editedCurriculum.value
    await curriculumService.updateCurriculum(curriculum)
  }

  async function addCoordinatorToCurriculum(curriculumId: string, user: { id: string }[]) {
    await curriculumService.addCoordinator(curriculumId, user)
  }

  async function addPlosToCurriculum(curriculumId: string, ploId: string) {
    await curriculumService.addCoordinator(curriculumId, ploId)
  }

  async function deleteCurriculum(id: string) {
    await curriculumService.delCurriculum(id)
    await fetchCurriculums()
  }

  function clearForm() {
    editedCurriculum.value = { ...initialCurriculum }
  }

  return {
    addCurriculum,
    curriculums,
    currentCurriculum,
    clearCurrentCurriculum,
    fetchCurriculum,
    fetchCurriculums,
    saveCurriculum,
    deleteCurriculum,
    editedCurriculum,
    fetchCurriculumsPage,
    totalCurriculums,
    clearForm,
    addCoordinatorToCurriculum,
    setCurrentCurriculum,
    addPlosToCurriculum
  }
})
