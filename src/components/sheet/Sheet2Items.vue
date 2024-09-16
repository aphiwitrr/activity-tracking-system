a
<script setup lang="ts">
/*! sheetjs (C) SheetJS -- https://sheetjs.com */
import { ref, onMounted } from 'vue'
// import VueTableLite from 'vue3-table-lite/ts'
import type { HeaderItem } from '@/types/HeaderItem'
import { read, utils, type WorkSheet, writeFile } from 'xlsx'

type DataSet = { [index: string]: WorkSheet }
type Row = any[]
type RowCB = (row: Row) => string
type Column = { field: string; label: string; display: RowCB }
type RowCol = { rows: Row[]; cols: Column[] }

const currFileName = ref<string>('')
const currSheet = ref<string>('')
const sheets = ref<string[]>([])
const workBook = ref<DataSet>({} as DataSet)
const rows = ref<Row[]>([])
const columns = ref<Column[]>([])
const loading = ref<boolean>(true)
const paging = ref<boolean>(true)

const items = ref()
const headerItems = ref<HeaderItem[]>([])

defineExpose({
  items,
  headerItems
})

const makeHeaderItems = () => {
  headerItems.value = rows.value[0].map((element) => ({
    title: element,
    key: element
  }))
}

const exportTypes: string[] = ['xlsx', 'xlsb', 'csv', 'html']

let cell = 0

function resetCell() {
  cell = 0
}

const getRowsCols = (data: DataSet, sheetName: string): RowCol => {
  const sheet = data[sheetName]
  if (!sheet) {
    throw new Error(`Sheet not found: ${sheetName}`)
  }

  const rows = utils.sheet_to_json<Row>(sheet, { header: 1 })
  const range = utils.decode_range(sheet['!ref'] || 'A1')
  if (!range) {
    throw new Error(`Range not found: ${sheetName}`)
  }

  return {
    rows,
    cols: Array.from({ length: range.e.c + 1 }, (_, i) => ({
      field: String(i),
      label: utils.encode_col(i),
      display: makeDisplay(i)
    }))
  }
}

const makeDisplay =
  (col: number): RowCB =>
  (row: Row) => `<span
  style="user-select: none; display: block"
  onblur="endEdit(event)" ondblclick="startEdit(event)"
  position="${Math.floor(cell++ / columns.value.length)}.${col}"
  onkeydown="endEdit(event)">${row?.[col] ?? '&nbsp;'}</span>`

;(window as any).startEdit = function (ev: MouseEvent) {
  ;(ev?.target as HTMLSpanElement).contentEditable = 'true'
  ;(ev?.target as HTMLSpanElement).focus()
}
;(window as any).endEdit = function (ev: FocusEvent | KeyboardEvent) {
  if (typeof (ev as KeyboardEvent).key == 'undefined' || (ev as KeyboardEvent).key === 'Enter') {
    const pos = (ev.target as HTMLSpanElement)?.getAttribute('position')?.split('.')
    if (!pos) return
    ;(ev?.target as HTMLSpanElement).contentEditable = 'true'

    rows.value[+pos[0]][+pos[1]] = (ev.target as HTMLSpanElement).innerText

    workBook.value[currSheet.value] = utils.json_to_sheet(rows.value, {
      header: columns.value.map((col: Column) => col.field),
      skipHeader: true
    })
  }
}

async function importAB(ab: ArrayBuffer, name: string): Promise<void> {
  loading.value = true
  const data = read(ab)

  currFileName.value = name
  currSheet.value = data.SheetNames?.[0]
  sheets.value = data.SheetNames
  workBook.value = data.Sheets
  loading.value = false

  selectSheet(currSheet.value)
}

async function importFile(ev: Event): Promise<void> {
  const file = (ev.target as HTMLInputElement)?.files?.[0]
  if (!file) return
  await importAB(await file.arrayBuffer(), file.name)
}

function exportFile(type: string): void {
  const wb = utils.book_new()

  sheets.value.forEach((sheet) => {
    utils.book_append_sheet(wb, workBook.value[sheet], sheet)
  })

  writeFile(wb, `sheet.${type}`)
}

function selectSheet(sheet: string): void {
  const { rows: newRows, cols: newCols } = getRowsCols(workBook.value, sheet)

  resetCell()

  currSheet.value = sheet
  columns.value = newCols
  rows.value = dropBlankRow(newRows)
  paging.value = newRows.length > 50

  items.value = utils.sheet_to_json(workBook.value[sheet])
  makeHeaderItems()
}

onMounted(async () => {
  const response = await fetch('https://docs.sheetjs.com/pres.numbers')
  await importAB(await response.arrayBuffer(), 'pres.numbers')
})

function dropBlankRow(rows: Row[]): Row[] {
  return rows.filter((row) => Object.values(row).some((v) => v !== null && v !== ''))
}
</script>

<template>
  <header class="imp-exp">
    <div class="import">
      <input type="file" id="import" @change="importFile" />
      <label for="import">import</label>
    </div>
    <span v-if="currFileName">{{ currFileName }}</span>
    <div class="export" v-if="currFileName">
      <span>export</span>
      <ul>
        <li v-for="(type, idx) in exportTypes" :key="idx" @click="exportFile(type)">
          {{ `.${type}` }}
        </li>
      </ul>
    </div>
  </header>
  <div class="sheets">
    <span
      v-for="(sheet, idx) in sheets"
      :key="idx"
      @click="selectSheet(sheet)"
      :class="[currSheet === sheet ? 'selected' : '']"
    >
      {{ sheet }}
    </span>
  </div>
  <!-- <vue-table-lite
    :is-loading="loading"
    :page-size="50"
    :columns="columns"
    :is-hide-paging="paging"
    :rows="rows"
  ></vue-table-lite> -->
</template>

<style>
.imp-exp {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  font-family: mono;
  color: #212529;
}

.import {
  font-size: medium;
}

.import input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.import label {
  background-color: white;
  border: 1px solid;
  padding: 0.3rem;
}

.export:hover {
  border-bottom: none;
}

.export:hover ul {
  display: block;
}

.export span {
  padding: 0.3rem;
  border: 1px solid;
  cursor: pointer;
}

.export ul {
  display: none;
  position: absolute;
  z-index: 5;
  background-color: white;
  list-style: none;
  padding: 0.3rem;
  border: 1px solid;
  margin-top: 0.3rem;
  border-top: none;
}

.export ul li {
  padding: 0.3rem;
  text-align: center;
}

.export ul li:hover {
  background-color: lightgray;
  cursor: pointer;
}

.sheets {
  display: flex;
  justify-content: center;
  margin: 0.3rem;
  color: #212529;
}

.sheets span {
  border: 1px solid;
  padding: 0.5rem;
  margin: 0.3rem;
}

.sheets span:hover:not(.selected) {
  background-color: lightgray;
  cursor: pointer;
}

.selected {
  background-color: #343a40;
  color: white;
}
</style>
