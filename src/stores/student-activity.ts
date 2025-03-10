import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import { ActivityService } from 'src/services/activity'
import { EnrollmentService } from 'src/services/enrollment'
import type { Activity } from 'src/types/activity'
import type { Pagination } from 'src/types/pagination'

import { ref } from 'vue'

const query = ref<Pagination>({
  page: 1,
  limit: 10,
  search: '',
  sortBy: 'id',
  order: 'DESC',
})
export const useStudentActivitystore = defineStore('activity', {
  state: () => ({
    dialogState: false,
    activity: [] as Activity[],
    form: <Partial<Activity>>{}, // ใช้ Spread Operator เพื่อป้องกันการเปลี่ยนค่าโดยตรง
    editMode: false,
    search: '',
  }),

  getters: {
    getData: (state) => state.activity,
  },

  actions: {
    async fetchData() {
      const data1 = await ActivityService.getAll(query.value, 'open')
      this.activity = data1.data
      console.log(data1.data)
    },

    async fetchOneData(id: string) {
      const data = await ActivityService.getOne(id)
      this.form = data.data
      console.log(data)
      console.log(this.form)
    },

    async enrollment(payload: object) {
      const status = await EnrollmentService.enrollment(payload)
      if (status === 201) {
        await this.fetchData()
      }
    },
    async createOne() {
      const status = await ActivityService.createOne(this.form)
      if (status === 201) {
        await this.fetchData()
        this.notifySuccess('เพิ่มกิจกรรมสำเร็จ')
        this.dialogState = false
        this.resetForm()
      }
    },

    async updateOne() {
      const status = await ActivityService.updateOne(this.form)
      if (status === 200) {
        await this.fetchData()
        this.notifySuccess('อัปเดตกิจกรรมสำเร็จ')
        this.dialogState = false
        this.resetForm()
      }
    },

    async removeOne(id: string) {
      await ActivityService.removeOne(id)
    },

    resetForm() {
      this.form = {}
    },

    notifySuccess(message: string) {
      Notify.create({ type: 'positive', message })
    },

    notifyError(message: string) {
      Notify.create({ type: 'negative', message })
    },
  },
})
