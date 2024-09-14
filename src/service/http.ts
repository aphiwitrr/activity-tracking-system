import router from '@/router'
import axios, { AxiosError } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// function delay(sec: number) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(sec), sec * 1)
//   })
// }

instance.interceptors.response.use(
  async function (res: any) {
    return res
  },
  function (error: AxiosError) {
    // const loadingStore = useLoadingStore()
    if (401 === error.status) {
      router.replace('/login')
      // loadingStore.finish()
    }
    return Promise.reject(error)
  }
)

export default instance
