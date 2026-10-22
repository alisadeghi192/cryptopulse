import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined

            if (id.includes('react-router')) return 'react-vendor'
            if (id.includes('/react-dom/') || id.includes('/react/'))
              return 'react-vendor'

            if (id.includes('@tanstack') || id.includes('axios'))
              return 'data-vendor'

            if (id.includes('@supabase') || id.includes('zustand'))
              return 'backend-vendor'

            if (id.includes('lightweight-charts')) return 'charts-vendor'

            if (
              id.includes('react-hook-form') ||
              id.includes('@hookform') ||
              id.includes('/zod/')
            )
              return 'forms-vendor'

            if (
              id.includes('lucide-react') ||
              id.includes('sonner') ||
              id.includes('class-variance-authority') ||
              id.includes('clsx') ||
              id.includes('tailwind-merge')
            )
              return 'ui-vendor'

            return undefined
          },
        },
      },
    },
    server: {
      proxy: {
        '/api/coingecko': {
          target: 'https://api.coingecko.com/api/v3',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/coingecko/, ''),
          headers: {
            'x-cg-demo-api-key': env.COINGECKO_API_KEY || '',
          },
        },
      },
    },
  }
})