import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.esm.js',
      'balm-ui-css': 'balm-ui/dist/balm-ui.css',
      'vue-flow-form-css': '@ditdot-dev/vue-flow-form/dist/vue-flow-form.css',
      'vue-flow-form-theme-css': '../src/assets/vue-flow-form.theme-custom.css'
    }
  }
})
