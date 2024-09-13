import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Skill } from '@/types/Skills'
import skillService from '@/service/skills'
import type { PageParams } from '@/types/PageParams'

export const useSkillStore = defineStore('skill', () => {
  const skills = ref<Skill[]>([])
  const skillss = ref<Skill[]>([])
  const dataInit = ref(true)
  const totalSkills = ref(0)
  const initialSkill: Skill = {
    id: '',
    name: '',
    description: '',
    level: 0,
    // subjects: [],
    children: [],
    techSkills: []
  }

  const editedSkill = ref<Skill>({ ...initialSkill })

  async function fetchSkill(id: string) {
    dataInit.value = false
    const res = await skillService.getSkill(id)
    editedSkill.value = res.data
    console.log(editedSkill.value)
    dataInit.value = true
  }

  async function fetchSkills() {
    const res = await skillService.getSkills()
    skillss.value = res.data
  }

  async function fetchSkillsPage(params: PageParams) {
    const res = await skillService.getSkillsByPage(params)
    skills.value = res.data.data
    totalSkills.value = res.data.total
  }

  async function setCurrentSkill(id: string) {
    const res = await skillService.getSkill(id)
    editedSkill.value = res.data
    // currentSkill.value = editedSkill.value
    console.log(editedSkill.value)
  }

  async function addSkill(addSkill: any) {
    console.log(addSkill)
    await skillService.addSkill(addSkill)
  }

  // async function addSubSkill(addSubSkill: any) {
  //   console.log(addSubSkill)
  //   await skillService.addSubSkill(addSubSkill)
  // }

  // async function addTechSkill(addTechSkill: any) {
  //   console.log(addTechSkill)
  //   await skillService.addTechSkill(addTechSkill)
  // }

  async function updateSkill(updatedSkill: Skill) {
    console.log(updatedSkill)
    await skillService.updateSkill(updatedSkill)
  }

  async function deleteSkill(id: string) {
    await skillService.delSkill(id)
    await fetchSkills()
  }

  async function deleteSubSkill(id: string, subSkillId: string) {
    await skillService.removeSubSkill(id, subSkillId)
  }

  async function deleteTechSkill(id: string, techSkillId: string) {
    await skillService.removeTechSkill(id, techSkillId)
  }

  function clearForm() {
    editedSkill.value = { ...initialSkill }
  }

  return {
    skills,
    skillss,
    dataInit,
    editedSkill,
    totalSkills,
    addSkill,
    // addSubSkill,
    // addTechSkill,
    updateSkill,
    fetchSkill,
    fetchSkillsPage,
    setCurrentSkill,
    fetchSkills,
    deleteSkill,
    deleteSubSkill,
    deleteTechSkill,
    clearForm
  }
})
