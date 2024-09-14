<template>
  <v-container>
    <p class="text-h4">Acquired Skills</p>
    <TreeSkillPlain :model-value="skills" readonly></TreeSkillPlain>
  </v-container>
</template>

<script lang="ts" setup>
import TreeSkillPlain from '@/components/TreeSkillPlain.vue'
import type { SkillNode } from '@/types/SkillNode'

const skills: SkillNode[] = [
  {
    id: 'softdev',
    name: 'Software Development Skills',
    pass: true,
    children: [{ id: 'softdev_meth', name: 'Software Development Methodologies', pass: false }]
  }
]
</script>
