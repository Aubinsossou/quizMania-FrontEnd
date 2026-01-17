import { defineStore } from 'pinia'

export const useScoreStore = defineStore('theme', {
  state: () => ({
    score: 0
  }),
  persist: true,
})