<template>
    <div class="hour-calculator-container">
        <img class="user-avatar" :class="{'user-avatar-focus': isFocused}" :src="`/img/${userState.avatar}.png`"/>
        <LabeledInput :label="`${userState.name} is`" caption="hours old" @focusAvatar="focus" @focusOutAvatar="focusOut"/>
    </div>   
</template>

<script setup lang="ts">
import LabeledInput from './ui-components/LabeledInput.vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/main';

const number = ref()
const userStore = useUserStore()

const name = ref<string>('')
const {userState, step} = storeToRefs(userStore)
const isFocused = ref<Boolean>(false)


function focus() {
    isFocused.value = true
}

function focusOut() {
    isFocused.value = false
}

</script>

<style scoped>
.hour-calculator-container {
    background-color: #EEC2C2;
    display: flex;
    gap: 18px;
    padding: 20px;
    border-radius: 20px;
}
.user-avatar {
    max-width: 80px;
    max-height: 80px;
    height: 80px;
    width: 80px;
    border-radius: 100%;
    padding: 2px;
    border: 1px solid transparent;
    transition: border 0.2s ease;
}

.user-avatar-focus {
    border: 1px solid #3D06D7;
    transition: border 0.2s ease;
}
</style>