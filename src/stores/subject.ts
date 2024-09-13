import type { Subject } from '@/types/Subjects'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import subjectService from '@/service/subject'
import type { PageParams } from '@/types/PageParams'
export const useSubjectStore = defineStore('subjectStore', () => {
  const subjects = ref<Subject[]>([])
  const currentSubject = ref<Subject | null>(null)
  const totalSubjects = ref(0)
  const id = ref('')
  const initialSubject: Subject = {
    id: '',
    thaiName: '',
    engName: '',
    description: '',
    credit: 0,
    type: '',
    studyTime: '',
    descriptionEng: ''
  }

  const editedSubject = ref<Subject>(JSON.parse(JSON.stringify(initialSubject)))

  function clearCurrentSubject() {
    currentSubject.value = null
  }

  const addSubject = (subject: Subject) => {
    subjects.value.push(subject)
  }

  async function fetchSubject(id: string) {
    const res = await subjectService.getSubject(id)
    editedSubject.value = res.data
  }

  // async function saveSubject(params: PageParams) {
  //     const subject = editedSubject.value;
  //     // if (!subject.id) { //if id is null
  //     console.log(subject)
  //     console.log('call funtion addSubject')
  //     const res = await subjectService.addSubject(subject);
  //     await fetchSubjects(params)
  //     console.log('Save to service' + res)
  //     // } else {
  //     //     console.log('update subject')
  //     //     const res = await subjectService.updateSubject(subject)
  //     //     await fetchSubjects()
  //     //     console.log(res)
  //     // }

  // }

  async function fetchAllSubjects() {
    const res = await subjectService.getSubjects()
    subjects.value = res.data
  }

  async function fetchSubjects(params: PageParams) {
    try {
      const res = await subjectService.getSubjectsByPage(params)
      subjects.value = res.data.data
      totalSubjects.value = res.data.total
      console.log(totalSubjects.value)
      console.log('Call fetchSubjects')
      console.log(res)
      console.log(subjects.value)
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  async function saveSubject(params: PageParams) {
    const subject = editedSubject.value
    // if (!subject.id) { //if id is null
    console.log(subject)
    console.log('call funtion addSubject')
    const res = await subjectService.addSubject(subject)
    await fetchSubjects(params)
    console.log('Save to service' + res)
    // } else {
    //     console.log('update subject')
    //     const res = await subjectService.updateSubject(subject)
    //     await fetchSubjects()
    //     console.log(res)
    // }
  }

  async function updateSubject() {
    const subject = editedSubject.value
    await subjectService.updateSubject(subject)
  }

  async function addCoordinatorToSubject(subjectId: string, userId: string) {
    await subjectService.addCoordinator(subjectId, userId)
  }

  async function deleteSubject(params: PageParams) {
    console.log('Call deleteSubject in store')
    const subject = editedSubject.value
    console.log(subject.id)
    await subjectService.delSubject(subject.id)
    await fetchSubjects(params)
  }

  function clearForm() {
    editedSubject.value = JSON.parse(JSON.stringify(initialSubject))
  }

  async function fetchSubjectsPage(params: PageParams) {
    // const res = await subjectService.getSubjectsByPage(params)
    // subjects.value = res.data.data
    // totalSubjects.value = res.data.total
    try {
      const res = await subjectService.getSubjectsByPage(params)
      subjects.value = res.data.data
      totalSubjects.value = res.data.total
      console.log(totalSubjects.value)
      console.log('Call fetchSubjects')
      console.log(res)
      console.log(subjects.value)
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  return {
    subjects,
    addSubject,
    clearCurrentSubject,
    initialSubject,
    clearForm,
    fetchSubject,
    fetchSubjects,
    editedSubject,
    fetchAllSubjects,
    saveSubject,
    updateSubject,
    addCoordinatorToSubject,
    deleteSubject,
    totalSubjects,
    fetchSubjectsPage,
    id
  }
})
