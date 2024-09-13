import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search-store', {
  state() {
    return {
      text: '',
      isDialogOpen: false
    }
  },
  actions: {
    switchToggle() {
      this.isDialogOpen = !this.isDialogOpen
    }
  }
})
