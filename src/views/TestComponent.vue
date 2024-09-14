<template>
  <Sheet2Items ref="theExpose" />
  <MainTable
    :items="theExpose?.items ?? []"
    :headers="theExpose?.headerItems ?? []"
    :pageTitle="'test'"
  ></MainTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Sheet2Items from '../components/sheet/Sheet2Items.vue'
import MainTable from '../components/table/MainTable.vue'
const theExpose = ref()
</script>
