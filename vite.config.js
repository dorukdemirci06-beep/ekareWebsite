import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'path'

const inlineCssPlugin = () => ({
  name: 'inline-css',
  enforce: 'post',
  generateBundle(options, bundle) {
    let cssCode = '';
    for (const key in bundle) {
      if (key.endsWith('.css') && bundle[key].type === 'asset') {
        cssCode += bundle[key].source;
        // Optionally delete the css file from the bundle to save space, but keeping it is safer.
      }
    }
    if (!cssCode) return;

    for (const key in bundle) {
      if (key.endsWith('.html') && bundle[key].type === 'asset') {
        let html = bundle[key].source;
        html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/gi, '');
        html = html.replace('</head>', `<style>${cssCode}</style>\n</head>`);
        bundle[key].source = html;
      }
    }
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
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
