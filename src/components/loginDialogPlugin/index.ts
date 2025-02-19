// 封装登录框逻辑
import {App, createApp} from 'vue'
import loginDialog from './loginDialog.vue'
const loginDialogPlugin = {
    install:(app: App) => {
        app.config.globalProperties.$showLoginDialog = () => {
            // 创建vue的实例对象
            const dialogApp = createApp(loginDialog)
            // 挂载到DOM中
            const dom = document.createElement('div')
            document.body.appendChild(dom)
            dialogApp.mount(dom)
        }
    }
}
export default loginDialogPlugin