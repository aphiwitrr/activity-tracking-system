import http from './http'
import type { Plos } from '@/types/Plos'

function addPlo(plo: Plos) {
  console.log(plo)
  return http.post('/plos', plo)
}
function updatePlo(plo: Plos) {
  return http.patch(`/plos/${plo.id}`, plo)
}

function delPlo(id: string) {
  return http.delete(`/plos/${id}`)
}

function getPlos() {
  return http.get<Plos[]>('/plos')
}

function getPlo(id: string) {
  return http.get<Plos>(`/plos/${id}`)
}

// function addCoordinator(skillId: string, userId: string) {
//   return http.patch(`/skills/${skillId}/coordinators`, { id: userId })
// }

export default {
  addPlo,
  updatePlo,
  delPlo,
  getPlos,
  getPlo
}
