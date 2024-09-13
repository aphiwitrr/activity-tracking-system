import http from './http'
import type { User } from '@/types/User'
import type { PageParams } from '@/types/PageParams'

function addUser(user: User) {
  console.log(user)
  return http.post('/users', user)
}

function updateUser(user: User) {
  return http.patch(`/users/${user.id}`, user)
}

function updateImageUser(userId: string, file: File) {
  const formData = new FormData()
  formData.append('image', file) // 'image' should match the name in the @UseInterceptors(FileInterceptor('image'))
  return http.post(`/users/${userId}/image/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

function delUser(id: string) {
  return http.delete(`/users/${id}`)
}

function getUsers() {
  return http.get<User[]>('/users')
}

function getUser(id: string) {
  return http.get<User>(`/users/${id}`)
}

function getUsersByPage(params: PageParams) {
  return http.get<{ data: User[]; total: number }>(`/users/pages`, { params })
}

export default {
  addUser,
  updateUser,
  delUser,
  getUsers,
  getUser,
  getUsersByPage,
  updateImageUser
}
