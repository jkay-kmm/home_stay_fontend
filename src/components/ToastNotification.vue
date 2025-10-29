<template>
  <transition name="toast">
    <div v-if="visible" class="toast-container" :class="type">
      <div class="toast-content">
        <div class="toast-icon">
          <svg v-if="type === 'success'" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
            <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" />
          </svg>
          <svg v-else-if="type === 'error'" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" />
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
            <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
        </div>

        <div class="toast-message">
          <h4 class="toast-title">{{ title }}</h4>
          <p class="toast-text">{{ message }}</p>
        </div>

        <button @click="close" class="toast-close">
          <svg viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" />
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'success', // 'success', 'error', 'warning'
    validator: (value) => ['success', 'error', 'warning'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 2000, // 2 seconds
  },
  autoClose: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close'])

let timeoutId = null

const close = () => {
  emit('close')
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

watch(
  () => props.visible,
  (newValue) => {
    if (newValue && props.autoClose) {
      timeoutId = setTimeout(() => {
        close()
      }, props.duration)
    } else if (!newValue && timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  },
)

// Auto close when component unmounts
onMounted(() => {
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  min-width: 300px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.toast-container.success {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%);
  color: white;
}

.toast-container.error {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);
  color: white;
}

.toast-container.warning {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.95) 0%, rgba(217, 119, 6, 0.95) 100%);
  color: white;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
}

.toast-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.toast-icon svg {
  width: 100%;
  height: 100%;
}

.toast-message {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.toast-text {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
  line-height: 1.4;
}

.toast-close {
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.toast-close svg {
  width: 16px;
  height: 16px;
}

/* Transition animations */
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

@media (max-width: 480px) {
  .toast-container {
    left: 20px;
    right: 20px;
    max-width: none;
    min-width: auto;
  }
}
</style>
