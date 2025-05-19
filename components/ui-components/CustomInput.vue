<template>
  <input
    class="auto-resize-input"
    type="text"
    :value="formattedValue"
    @input="handleInput"
    @keydown="handleKeyDown"
    @blur="handleBlur"
    @focus="handleFocus"
    @focusout="handleFocusOut"
    :placeholder="placeholder"
    :disabled="disabled"
    ref="inputRef"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'number'
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: Event): void;
  (e: 'focus', event: Event): void;
  (e: 'focusout', event: Event): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const formattedValue = computed(() => {
  const numStr = String(props.modelValue).replace(/\s/g, '');
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
});

const handleKeyDown = (e: KeyboardEvent) => {
  const allowedKeys = [
    'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 
    'Home', 'End'
  ];

  if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
    return;
  }

  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
};

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  let rawValue = target.value.replace(/[^\d]/g, '');
  emit('update:modelValue', rawValue);
  
  nextTick(() => {
    resizeInput();
  });
};

const resizeInput = () => {
  if (!inputRef.value) return;
  
  const tempSpan = document.createElement('span');
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.whiteSpace = 'pre';
  tempSpan.style.font = window.getComputedStyle(inputRef.value).font;
  tempSpan.textContent = inputRef.value.value || inputRef.value.placeholder;
  
  document.body.appendChild(tempSpan);
  
  const padding = parseInt(window.getComputedStyle(inputRef.value).paddingLeft) + 
                 parseInt(window.getComputedStyle(inputRef.value).paddingRight);
  const border = parseInt(window.getComputedStyle(inputRef.value).borderLeftWidth) + 
                 parseInt(window.getComputedStyle(inputRef.value).borderRightWidth);
  
  const newWidth = Math.max(tempSpan.offsetWidth + padding + border, 72);
  inputRef.value.style.width = `${newWidth}px`;
  
  document.body.removeChild(tempSpan);
};

onMounted(() => {
   if (inputRef.value) {
    inputRef.value.style.width = '72px';
  }
  resizeInput();
});

const handleBlur = (e: Event) => {
  emit('blur', e);
};

const handleFocus = (e: Event) => {
  emit('focus', e);
};

const handleFocusOut = (e: Event) => {
  emit('focusout', e);
};

watch(() => props.modelValue, () => {
  nextTick(() => {
    resizeInput();
  });
});
</script>

<style scoped>
.auto-resize-input {
  min-width: 72px;
  box-sizing: border-box;
  padding: 11px 8px;
  border: 1px solid #CFCADF;
  border-radius: 6px;
  font-family: inherit;
  font-size: inherit;
  color: #CFCADF;
  outline: none;
  transition: border-color 0.2s ease, color 0.2s ease;
  width: auto;
  max-width: 100%;
}

.auto-resize-input:focus {
  color: #1E0E4C;
  border-color: #906FEE;
}

.auto-resize-input::-webkit-outer-spin-button,
.auto-resize-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>