import type { Department } from '@/types/Department'
import http from './http'

function addDepartment(department: Department) {
  return http.post('/departments', department)
}

function updateDepartment(department: Department) {
  return http.patch(`/departments/${department.id}`, department)
}

function delDepartment(department: Department) {
  return http.delete(`/departments/${department.id}`)
}

function getDepartment(department: string) {
  return http.get(`/departments/${department}`)
}

function getDepartments() {
  return http.get('/departments')
}

export default { addDepartment, updateDepartment, delDepartment, getDepartment, getDepartments }
