import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export default axiosInstance
