import axios from 'axios'
// import { store, dispatch } from '../store'
import { API_ENDPOINT } from '../config'
import { STORE_KEY_TOKEN } from '@/config/constants'

export const client = axios.create({
  baseURL: API_ENDPOINT,
  responseType: 'json'
})

client.interceptors.request.use(config => {
  const token = localStorage.getItem(STORE_KEY_TOKEN)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

client.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error && error?.response?.status === 401) {
      // dispatch.auth.logout(null)
    }
    return Promise.reject(error.response)
  }
)
