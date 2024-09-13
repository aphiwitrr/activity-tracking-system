import { defineStore } from 'pinia'
import authService from '@/service/auth'
import { ref } from 'vue'
import type { Profile } from '@/types/Profile'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      form: {
        email: '',
        password: ''
      },
      user: ref<Profile | null>(null)
    }
  },
  getters: {
    isAuthenticated: (s) => !!s.user
  },
  actions: {
    async fetchProfile(): Promise<Profile | null> {
      try {
        const res = await authService.profile()
        this.user = res
        return res
      } catch (e) {
        console.error(e)
        return null
      }
    },
    async login() {
      try {
        await authService.login(this.form.email, this.form.password)
        this.user = await authService.profile()
        router.replace('/')
      } catch (e) {
        console.error(e)
      }
    },
    loginGoogle() {
      authService.loginGoogle()
    },
    logout() {
      authService.logout()
      this.user = null
      router.replace('/')
    }
  }
})
