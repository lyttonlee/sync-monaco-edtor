// 引入pinia
import {defineStore} from 'pinia'

export const useUser = defineStore('useUser', {
  state: () => {
    return {
        name: localStorage.getItem('name') || ''
    }
  }
})