import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// import reactRefresh from '@vitejs/plugin-react-refresh';
const myObject = {
  tagValue: 'Custom Value'
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      cssInjectedByJsPlugin(),
      // reactRefresh(),
    ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  test: {
    environment: "jsdom",
    css: true,
  },

  // html: {
  //   transform: {
  //     enable: true,
  //     transformIndexHtml(html) {
  //       // Modify the HTML content here
  //       const modifiedHtml = html.replace(/<tag>.*?<\/tag>/g, '<tag>Custom Value</tag>');
  //       return modifiedHtml;
  //     }
  //   }
  // }

  build: {
    rollupOptions: {
      // Sharing the React and ReactDOM packages
      external: ['react', 'react-dom'],
      output: {
        // Provide a global variable name for the shared components
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  define: {
    global: 'window',
    },
  html: {
    inject: {
      data: {
        myObject
      }
    }
  },
  
})
