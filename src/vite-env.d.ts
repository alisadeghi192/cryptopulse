/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_BINANCE_WS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}