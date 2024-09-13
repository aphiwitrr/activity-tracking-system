import type { Profile } from '@/types/Profile'
import http from './http'
import type { AxiosResponse } from 'axios'
import router from '@/router'

async function login(email: string, password: string): Promise<AxiosResponse> {
  const res = await http.post('/auth/login', { email, password })
  router.push('/')
  return res.data
}

function loginGoogle() {
  window.location.href = http.defaults.baseURL + '/auth/google'
}

async function logout(): Promise<AxiosResponse> {
  try {
    const res = await http.post(`/auth/logout`, { withCredentials: true })
    return res.data
  } catch (error) {
    console.error('Logout failed', error)
    throw error
  }
}

async function profile(): Promise<Profile | null> {
  try {
    const res = await http.get('/auth/profile')
    return res.data
  } catch (err) {
    return null
  }
}

export default { login, loginGoogle, profile, logout }
