import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://dekdee3.informatics.buu.ac.th:8888', // เปลี่ยนเป็น URL ของ API หลังบ้าน
  timeout: 10000, // กำหนด timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
