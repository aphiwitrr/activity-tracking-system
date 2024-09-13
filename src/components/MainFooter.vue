<template>
  <v-footer class="bg-primary">
    <v-container flat style="max-width: 1440px">
      <v-row>
        <v-col v-for="n in navFooter" :key="n.title" cols="12" sm="3">
          <h3>{{ n.title }}</h3>
          <v-list class="bg-transparent">
            <v-list-item
              nav
              density="comfortable"
              v-for="s in n.sub"
              :key="s.name"
              :to="s.to"
              variant="plain"
            >
              {{ `> ${s.name}` }}</v-list-item
            >
          </v-list>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <p>
          Copyright © 2018-2024 Faculty of Informatics, Burapha University. All rights reserved.
        </p>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts" setup>
type NavFooter = {
  title: string
  sub: { name: string; to: string }[]
}

const navFooter: NavFooter[] = [
  {
    title: 'เกี่ยวกับคณะ',
    sub: [
      { name: 'แนะนำ', to: '' },
      { name: 'สารจากสารคดี', to: '' }
    ]
  },
  {
    title: 'เมนูลัด',
    sub: [
      { name: 'ข้อบังคับ', to: '' },
      { name: 'สหกิจศึกษา', to: '' }
    ]
  },
  {
    title: 'ที่อยู่',
    sub: [{ name: '169 ถนนลงหาดบางแสน ตำบลแสนสุข อำเภอเมือง จังหวัดชลบุรี 20131', to: '' }]
  },
  {
    title: 'ติดต่อ',
    sub: [
      { name: 'สำนักงานคณบดี โทร. +66 (0)38-103061', to: '/contacts' },
      { name: 'สำนักงานการศึกษา โทร. +66 (0)38-103096', to: '/contacts' },
      { name: 'pr@informatics.buu.ac.th', to: '/contacts' }
    ]
  }
]
</script>
