import type { Role } from '@/types/Role'
import http from './http'

function addRole(role: Role) {
  return http.post('/roles', role)
}

function updateRole(role: Role) {
  return http.patch(`/roles/${role.id}`, role)
}

function delRole(role: Role) {
  return http.delete(`/roles/${role.id}`)
}

function getRole(id: number) {
  return http.get(`/roles/${id}`)
}

function getRoles() {
  return http.get('/roles')
}

export default { addRole, updateRole, delRole, getRole, getRoles }
