import router from '@/router'
import axios, { AxiosError } from 'axios'
// import Cookies from 'js-cookie'

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

// instance.interceptors.request.use((config: any) => {
// const token = document.cookie
//   .split(';')
//   .find((c) => c.trim().startsWith('access_token='))
// ?.split('=')[1]
// console.log(JSON.stringify(document.cookie))
// console.log(token)
//   const token = Cookies.get('access_token')
//   console.log(token)
//   if (token) {
//     config.headers = {
//       ...config.headers,
//       Authorization: `Bearer ${token}`
//     }
//   } else {
//     console.log('no token')
//   }
//   return config
// })

instance.interceptors.response.use(
  async function (res: any) {
    return res
  },
  function (error: AxiosError) {
    // const loadingStore = useLoadingStore()
    // if (401 === error.status) {
    //   router.replace('/login')
    //   // loadingStore.finish()
    // }
    // return Promise.reject(error)
  }
)

export default instance
