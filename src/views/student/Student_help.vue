<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" v-for="topic in topics" :key="topic.title">
        <v-card :title="t(topic.title)">
          <template #text>
            {{ topic.description }}
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useLocale } from 'vuetify'

const { t } = useLocale()

interface Topic {
  title: string
  description: string
  href: string
}

const topics: Topic[] = [
  {
    title: 'Student Services',
    description: 'e.g. Documents, Tutorials, etc.',
    href: '/student/help'
  },
  {
    title: 'Data Center',
    description: 'Fact, Interest, etc.',
    href: '/student/help'
  },
  {
    title: 'FAQ',
    description: 'Frequently Asked Questions',
    href: '/student/help'
  },
  {
    title: 'Contact',
    description: 'สำนักงานคณบดี โทร. +66 (0)38-103061 \n สำนักงานการศึกษา โทร. +66 (0)38-103096',
    href: '/student/help'
  }
]
</script>

<style></style>
