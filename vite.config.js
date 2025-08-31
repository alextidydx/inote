import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr' 

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr({svgrOptions: {}}),
    //replace assets from css
    {
      name: 'rewrite-css-asset-paths',
      generateBundle(options, bundle) {
        for (const fileName in bundle) {
          if (fileName.endsWith('.css')) {
            const file = bundle[fileName];
            file.source = file.source.replace(/\.\/assets\/images\//g, './images/');
          }
        }
      },
    }
  ],
  base: '/demo/finam/',
  sass: {
    api: 'modern-compiler',
  },
  build: {
    assetsDir: '', // Remove 'assets' folder from URLs
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})