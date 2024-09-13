import type { Faculty } from '@/types/Faculty'
import http from './http'

function addFaculty(faculty: Faculty) {
  return http.post('/faculties', faculty)
}

function updateFaculty(faculty: Faculty) {
  return http.patch(`/faculties/${faculty.id}`, faculty)
}

function delFaculty(id: string) {
  return http.delete(`/faculties/${id}`)
}

function getFaculty(id: string) {
  return http.get(`/faculties/${id}`)
}

function getfaculties() {
  return http.get('/faculties')
}

function getBranchIds() {
  return http.get('/faculties/getBranchIds')
}

export default { addFaculty, updateFaculty, delFaculty, getFaculty, getfaculties, getBranchIds }
