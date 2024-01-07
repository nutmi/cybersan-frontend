import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => {
    return {
      authorized: false, // Initially set to false
    }
  },
  actions: {
    setAuthorized(value) {
      this.authorized = value
    },
  },
})
