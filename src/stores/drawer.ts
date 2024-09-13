import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state() {
    return {
      isDrawerOpen: true
    }
  },
  actions: {
    switchDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen
    },
    setDrawerOpen(value: boolean) {
      this.isDrawerOpen = value
    }
  }
})
