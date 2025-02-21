//import './assets/main.css'
import './assets/css/normalize.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PiniaPluginPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
const store = createPinia()
store.use(PiniaPluginPersist)

// 引入登录框插件
import loginDialogPlugin from "@plugin/loginDialogPlugin/index.ts";

const app = createApp(App)
//引入 总览 的弹窗
import dialog from '@components/dialog/index.vue'
app.component('AIdialog',dialog)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(loginDialogPlugin)

app.mount('#app')
