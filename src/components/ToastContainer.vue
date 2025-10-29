<template>
  <teleport to="body">
    <div class="toast-container-wrapper">
      <ToastNotification
        v-for="toast in toasts"
        :key="toast.id"
        :visible="toast.visible"
        :type="toast.type"
        :title="toast.title"
        :message="toast.message"
        :duration="toast.duration"
        :auto-close="false"
        @close="hideToast(toast.id)"
      />
    </div>
  </teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast.js'
import ToastNotification from './ToastNotification.vue'

const { toasts, hideToast } = useToast()
</script>

<style scoped>
.toast-container-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  pointer-events: none;
}

.toast-container-wrapper > * {
  pointer-events: auto;
  margin-bottom: 10px;
}
</style>
