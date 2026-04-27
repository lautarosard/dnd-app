import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Se actualiza sola cuando haces cambios
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Grimorio Arcano D&D',
        short_name: 'Grimorio',
        description: 'Tu biblioteca de hechizos mágica',
        theme_color: '#1a1a1a', // Tu color de fondo
        background_color: '#1a1a1a',
        display: 'standalone', // Hace que parezca una app nativa (sin barra de navegador)
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true // Esto ayuda a ver la PWA incluso en modo dev
      }
    })
  ]
})