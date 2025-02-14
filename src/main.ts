//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PiniaPluginPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
const store = createPinia()
store.use(PiniaPluginPersist)
const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
