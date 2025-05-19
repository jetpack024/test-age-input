<template>
    <div class="avatar-container">
        <div>✨ Pick an Avatar! ✨</div>
            <div class="grid-container">
                <div class="grid-item" v-for="(avatarSrc, key) in avatarArray" :key="key" @click="selectAvatar(avatarSrc)">
            <img :src="`/img/${avatarSrc}.png`"/>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
const avatarArray = ['avatar4', 'avatar1']

import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/main';

const userStore = useUserStore()

const {userState, step} = storeToRefs(userStore)

function selectAvatar(avatarName: string) {
    step.value = 2
    userState.value.avatar = avatarName
}
</script>

<style scoped lang="css">
.avatar-container {
    background-color: #B28CE0;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 20px;
    padding-top: 10px;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    column-gap: 16px;        
    padding: 20px;
    max-width: 800px;
    align-items: center;
    justify-content: center;

}
    
.grid-item {
    background-color: #f5f5f5;
    border: 3px solid #e0e0e0;
    cursor: pointer;
    padding: 20px;
    border-radius: 8px;     
    transition: border 0.2s ease;   
}
.grid-item:hover {
     border: 3px solid #AECEEA ;
      
}

.grid-item img {
    max-width: 170px;
    min-height: 170px;
 }   
</style>