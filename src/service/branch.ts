import type { Branch } from '@/types/Branch'
import http from './http'

function addBranch(branch: Branch) {
  return http.post('/branchs', branch)
}

function updateBranch(branch: Branch) {
  return http.patch(`/branchs/${branch.id}`, branch)
}

function delBranch(branch: Branch) {
  return http.delete(`/branchs/${branch.id}`)
}

function getBranch(id: string) {
  return http.get(`/branchs/${id}`)
}

function getBranchs() {
  return http.get('/branchs')
}

export default { addBranch, updateBranch, delBranch, getBranch, getBranchs }
