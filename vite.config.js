import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bale: resolve(__dirname, 'bale-kursu.html'),
        salsaBachata: resolve(__dirname, 'salsa-ve-bachata-kursu.html'),
        kpop: resolve(__dirname, 'k-pop-dans-kursu.html'),
        hiphop: resolve(__dirname, 'hip-hop-dans-kursu.html'),
        piyano: resolve(__dirname, 'piyano-kursu.html'),
        keman: resolve(__dirname, 'keman-kursu.html'),
        gitar: resolve(__dirname, 'gitar-kursu.html'),
        sanDersi: resolve(__dirname, 'san-dersi.html')
      }
    }
  }
})
