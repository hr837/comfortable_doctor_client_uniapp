import { createSSRApp } from 'vue'
import App from './App.vue'
import '@/styles'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
