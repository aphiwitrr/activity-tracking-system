import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Clos } from '@/types/Clos'
import cloService from '@/service/clos'
import type { PageParams } from '@/types/PageParams'

export const useCloStore = defineStore('clo', () => {
  const clos = ref<Clos[]>([])
  const dataInit = ref(true)
  const totalClos = ref(0)
  const initialClo: Clos = {
    id: '',
    name: '',
    description: '',
    subject: {
      id: '',
      thaiName: '',
      engName: '',
      description: '',
      credit: 0,
      type: '',
      studyTime: '',
      descriptionEng: ''
    },
    plo: {
      id: '',
      num_plo: '',
      description: '',
      resultTypes: null,
      curriculum: {
        id: '',
        thaiName: '',
        engName: '',
        thaiDegreeName: '',
        engDegreeName: '',
        branch: [],
        description: '',
        period: '',
        minimumGrade: 0,
        plos: [],
        coordinators: [],
        subjects: []
      }
    }
  }

  const editedClo = ref<Clos>({ ...initialClo })

  async function fetchClo(id: string) {
    dataInit.value = false
    const res = await cloService.getClo(id)
    editedClo.value = res.data
    // console.log(editedClo.value)
    dataInit.value = true
  }

  // async function fetchClos() {
  //   const res = await cloService.getClos()
  //   clos.value = res.data
  // }
  async function fetchClosPage(params: PageParams) {
    const res = await cloService.getClosByPage(params)
    clos.value = res.data.data
    // console.log(res.data.data)

    totalClos.value = res.data.total
  }

  async function setCurrentClo(id: string) {
    const res = await cloService.getClo(id)
    editedClo.value = res.data
    console.log(editedClo.value)
  }

  async function addClo(addClo: any) {
    console.log(addClo)
    await cloService.addClos(addClo)
  }

  async function updateClo(updatedClo: Clos) {
    console.log(updatedClo)
    await cloService.updateClos(updatedClo)
  }

  async function deleteClo(id: string) {
    await cloService.delClos(id)
    // await fetchClos()
  }

  function clearForm() {
    editedClo.value = { ...initialClo }
  }

  return {
    clos,
    dataInit,
    editedClo,
    totalClos,
    addClo,
    updateClo,
    fetchClo,
    fetchClosPage,
    setCurrentClo,
    // fetchClos,
    deleteClo,
    clearForm
  }
})
