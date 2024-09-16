import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Plos } from '@/types/Plos'
import ploService from '@/service/plos'

export const usePloStore = defineStore('plo', () => {
  const plos = ref<Plos[]>([])
  const currentPlo = ref<Plos | null>(null)

  const initialPlos: Plos = {
    id: '',
    num_plo: '',
    description: '',
    resultTypes: '',
    curriculum: {
      id: '',
      thaiName: '',
      engName: '',
      thaiDegreeName: '',
      engDegreeName: '',
      branch: [],
      description: '',
      coordinators: [],
      period: '',
      minimumGrade: 0,
      plos: [],
      subjects: []
    }
  }

  const editedPlo = ref<Plos>({ ...initialPlos })

  function clearCurrentPlo() {
    currentPlo.value = null
  }

  const addPlo = (plo: Plos) => {
    plos.value.push(plo)
  }

  async function fetchPlo(id: string) {
    const res = await ploService.getPlo(id)
    editedPlo.value = res.data
  }

  async function fetchPlos() {
    const res = await ploService.getPlos()
    plos.value = res.data
  }

  async function savePlo() {
    const plo = editedPlo.value
    await ploService.addPlo(plo)
  }

  async function updatePlo() {
    const plo = editedPlo.value
    await ploService.updatePlo(plo)
  }

  async function deletePlo(id: string) {
    await ploService.delPlo(id)
    await fetchPlos()
  }

  function clearForm() {
    editedPlo.value = { ...initialPlos }
  }

  return {
    plos,
    currentPlo,
    clearForm,
    editedPlo,
    clearCurrentPlo,
    addPlo,
    fetchPlo,
    savePlo,
    fetchPlos,
    updatePlo,
    deletePlo
  }
})
