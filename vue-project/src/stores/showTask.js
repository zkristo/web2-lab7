import { defineStore } from 'pinia'

export const useAddTaskStore = defineStore({
  id: 'isShown',
  state: () => ({
    isShown: false
  }),
  actions: {
    showTask() {
      this.isShown = true
    },
    hideTask() {
      this.isShown = false
    },
    toggleTask() {
      this.isShown = !this.isShown
    }
  }
})