import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/api/coingecko',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ─── Request Interceptor ─────────────────────


// ─── Response Interceptor ────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      code: error.code,
      data: error.response?.data,
    })
    return Promise.reject(error)
  }
)