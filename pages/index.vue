<template>
    <div>
        <Welcome v-if="step === 0"/>
        <Avatar v-if="step === 1"/>
        <HourCounter v-if="step === 2"/>
    </div>
</template>


<script setup lang="ts">
import Welcome from '~/components/Welcome.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/main';
import HourCounter from '~/components/HourCounter.vue';
const userStore = useUserStore()

const {step} = storeToRefs(userStore)

</script>
<style lang="css">

</style>