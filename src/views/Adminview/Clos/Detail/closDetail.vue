<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSkillStore } from '@/stores/skills'

const route = useRoute()
const router = useRouter()
const skillStore = useSkillStore()
const skills = computed(() => skillStore.editedSkill)

async function fetchSkillDetail(id: string) {
  try {
    await skillStore.fetchSkill(id)
  } catch (error) {
    console.error('Failed to fetch skill details:', error)
  }
}

function saveSkill() {
  let skill
  skill = { ...skills.value }
  if (route.params.id !== 'addSkill') {
    skillStore.updateSkill(skill)
    router.push({ name: 'SkillView' })
  } else {
    const payload: { name: string; description: string } = {
      name: skill.name,
      description: skill.description
    }
    skillStore.addSkill(payload)
    router.push({ name: 'SkillView' })
  }
}

onMounted(() => {
  if (!route.params.id) return
  else if (route.params.id !== 'addSkill') {
    fetchSkillDetail(route.params.id as string)
  }
})
</script>

<template>
  <v-container>
    <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'สกิล']">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <p style="font-size: 30px">รายละเอียดสกิล</p>

    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="skills.name"
          :counter="10"
          label="Name"
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="skills.description"
          :counter="10"
          label="Description"
          hide-details
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="skills.description"
          :counter="10"
          label="Colors Tag"
          hide-details
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row
      ><v-col>
        <v-btn @click="saveSkill()"> Button </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
