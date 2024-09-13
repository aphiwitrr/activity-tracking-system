<script setup lang="ts">
const props = defineProps<{
  message: string
}>()
</script>

<template>
  <v-alert
    closable
    icon="$vuetify"
    title="Alert title"
    :text="props.message"
    type="success"
  ></v-alert> 
</template>

<!-- <template>
    <v-alert
      :border-color="type"
      :type="type"
      class="v-alert--doc mb-4 border-opacity-100"
      variant="tonal"
    >
      <template #prepend>
        <v-icon :color="type" :icon="icon" />
      </template>
      <slot></slot>
    </v-alert>
  </template>
  
  <script setup>
  const props = defineProps({ type: String })
  
  const type = computed(() => {
    return props.type === 'tip' ? 'success' : props.type
  })
  const icon = computed(() => {
    switch (type.value) {
      case 'error':
        return 'mdi-close-circle-outline'
      case 'info':
        return 'mdi-information-outline'
      case 'success':
        return 'mdi-check-circle-outline'
      case 'warning':
        return 'mdi-alert-circle-outline'
      default:
        return '$vuetify'
    }
  })
  </script> -->
