import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface UserState {
  avatar: string;
  name: string;
}

export const useUserStore = defineStore('user', () => {
    const userState = reactive<UserState>({
        avatar: '',
        name: '',
    })
    const step = ref<number>(0)

    return {
     step,
     userState
    }
});