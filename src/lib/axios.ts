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
    if (error.response) {
      const { status } = error.response

      if (status === 429) {
        console.error('Rate limit exceeded. Please try again later.')
      }
      if (status >= 500) {
        console.error('Server error. Please try again.')
      }
    } else if (error.request) {
      console.error('Network error. Check your connection.')
    }

    return Promise.reject(error)
  }
)