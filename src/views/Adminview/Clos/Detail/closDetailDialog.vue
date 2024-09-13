<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCloStore } from '@/stores/clos'
import { usePloStore } from '@/stores/plos'

const route = useRoute()
const props = defineProps<{ visible: boolean; item: any | null }>()
const emit = defineEmits(['close-dialog'])
const cloStore = useCloStore()
const plosStore = usePloStore()
const plos = computed(() => plosStore.plos)
const clos = computed(() => cloStore.editedClo)
const localVisible = ref(props.visible)
const select2 = ref<any | null>(null)
const plosOptions = computed(() => {
  return plos.value.map((plos) => {
    return `${plos.id} ${plos.description}`
  })
})

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
  }
)

const closeDialog = async () => {
  emit('close-dialog')
}

function saveClo() {
  console.log(clos.value.id)
  console.log(select2.value)
  let clo = { ...clos.value }
  clos.value.plo = select2.value
  if (clos.value.id != '') {
    console.log('update')
    cloStore.updateClo(clo)
    closeDialog()
  } else {
    const payload: { name: string; description: string; subject: object; plo: object } = {
      name: clo.name,
      description: clo.description,
      subject: clo.subject,
      plo: clo.plo
    }
    console.log(payload)
    cloStore.addClo(payload)
    closeDialog()
  }
}
onMounted(() => {
  plosStore.fetchPlos()
})
</script>

<template>
  <v-dialog
    v-model="localVisible"
    max-width="1000px"
    persistent
    style="height: 100vh; overflow-y: auto"
  >
    <v-card
      class="elevation-5"
      rounded="lg"
      max-width="1000px"
      width="100%"
      height="100%"
      style="min-width: 200px"
    >
      <v-container style="width: 100%; height: 100%">
        <div style="display: flex; justify-content: flex-end">
          <v-btn
            color="primary"
            variant="plain"
            @click="closeDialog"
            style="height: 40px; width: 40px"
            class="circular-btn"
            icon="mdi-close"
            rounded="lg"
          />
        </div>
        <p style="font-size: 30px">CloDetail</p>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="clos.name"
              :counter="10"
              label="Name"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="clos.description"
              :counter="10"
              label="Description"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="clos.subject"
              :return-object="true"
              item-text="name"
              item-value="id"
              label="Subject"
              hide-details
              required
            ></v-select>
          </v-col>
          <v-col cols="12">
            <p style="font-size: 1.5vh">PLO</p>
            <v-select
              v-model="select2"
              :return-object="true"
              :items="plos"
              item-title="description"
              item-value="id"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="saveClo">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
