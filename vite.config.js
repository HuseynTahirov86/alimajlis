import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Vətəndaş Qəbulu Posteri',
        short_name: 'Poster',
        description: 'Ali Məclis deputatları üçün vətəndaş qəbulu posteri hazırlama tətbiqi',
        theme_color: '#0f172a',
        background_color: '#020617',
        display: 'standalone',
        icons: [
          {
            src: '/ali-meclis-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/ali-meclis-logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
