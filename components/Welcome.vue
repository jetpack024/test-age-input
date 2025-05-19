<template>
    <div class="welcome-container">
        <div class="welcome-info">
            Welcome! 👋
            Please enter your name to get started
            <div class="welcome-form">
                <input v-model="name" type="text" class="name-input"/>
                <button class="welcome-button" @click="submit">Submit</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/main';
import CustomInput from './ui-components/CustomInput.vue';

const userStore = useUserStore()

const name = ref<string>('')
const {userState, step} = storeToRefs(userStore)

function submit():void {
 step.value = 1
 userState.value.name = name.value
}

</script>

<style scoped lang="css">
.welcome-container {
    display: flex;
    align-items: center;
    justify-content: center;
}
.welcome-info {
    background-color: #EECEAE ;
    padding: 20px;
    border-radius: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
}

.welcome-form {
    display: flex;
    gap: 10px;
}

.welcome-button {
 cursor: pointer;
 border-radius: 6px;
 border: none;
 border: 1px solid #D9A3EB;
 background-color: #AEEECE;
 opacity: 80%;
 transition: opacity 0.2s ease;
}

.welcome-button:hover {
 opacity: 100%;
}

.name-input {
  min-width: 72px;
  box-sizing: border-box;
  padding: 11px 8px;
  border: 1px solid #71816D;
  border-radius: 6px;
  font-family: inherit;
  font-size: inherit;
  color: #CFCADF;
  outline: none;
  transition: border-color 0.2s ease, color 0.2s ease;
  width: auto;
  max-width: 100%;
}

.name-input:focus {
  color: #1E0E4C;
  border-color: #DA667B;
}
</style>