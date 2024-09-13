<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import AlertMessage from './AlertMessage.vue'

const props = defineProps<{
  initialPreviewUrl: string | null
  initialErrorMessage: string | null
  uploadFile: (file: File) => Promise<void>
  lebel: string
  width: string
  height: string
}>()

// const emits = defineEmits<{
//   (e: 'file-changed', file: File | null): void
// }>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(props.initialPreviewUrl)
const errorMessage = ref<string | null>(props.initialErrorMessage)

const validateFile = (file: File): string | null => {
  if (file.size > 2000000) {
    return 'Avatar size should be less than 2 MB!'
  }
  if (!file.type.startsWith('image/')) {
    return 'Only image files are allowed!'
  }
  return null
}

watch(
  () => props.initialPreviewUrl,
  (newValue) => {
    previewUrl.value = newValue
  }
)

watch(
  () => props.initialErrorMessage,
  (newValue) => {
    errorMessage.value = newValue
  }
)

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const onFileChange = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files && files[0]) {
    const file = files[0]
    const validationResult = validateFile(file)

    if (validationResult === null) {
      errorMessage.value = null
      const reader = new FileReader()
      reader.onload = async () => {
        previewUrl.value = reader.result as string
        // emits('file-changed', file)

        // Call the service to upload the file
        try {
          await props.uploadFile(file) // Upload file API
          alert('File uploaded successfully')
        } catch (error) {
          errorMessage.value = 'Error uploading file'
          console.error(error)
        }
      }
      reader.readAsDataURL(file)
    } else {
      errorMessage.value = validationResult
      previewUrl.value = null
      //   emits('file-changed', null)
    }
  }
}
</script>

<template>
  <div class="upload-container">
    <input
      type="file"
      ref="fileInput"
      @change="onFileChange"
      accept="image/*"
      style="display: none"
    />
    <v-btn :width="props.width" :height="props.height" @click="triggerFileInput" color="primary">
      {{ props.lebel }}</v-btn
    >
    <div v-if="previewUrl" class="image-preview"></div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
