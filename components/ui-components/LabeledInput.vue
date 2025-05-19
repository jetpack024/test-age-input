<template>
    <div class="labeled-input">
        <div :class="{'label-focus': isFocused}">{{ label }}</div>
        <div class="input-with-description">
            <CustomInput v-model="number" @focus="emitFocus" @focusout="emitFocusOut"/>
            <div>{{ caption }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CustomInput from './CustomInput.vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '~/store/main';

const userStore = useUserStore()
const {userState, step} = storeToRefs(userStore)
const number = ref()

const emit = defineEmits<{
  (e: 'focusAvatar'): void
  (e: 'focusOutAvatar'): void
}>()

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  caption: {
    type: String,
    default: ''
  }
});

const isFocused = ref<Boolean>(false)


function emitFocus() {
    isFocused.value = true
    emit('focusAvatar')
}

function emitFocusOut() {
    isFocused.value = false
    emit('focusOutAvatar')
}

</script>

<style scoped>
.labeled-input {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.input-with-description {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 18px;
}

.label-focus {
    color: #3D06D7;
}
</style>