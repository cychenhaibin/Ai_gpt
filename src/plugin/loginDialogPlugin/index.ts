// 封装登录框逻辑
import {App, createApp, onUnmounted} from 'vue'
import loginDialog from './loginDialog.vue'
// 挂载
let dialogInstance:App | null = null
// DOM
let dialogElement:HTMLElement | null = null

const loginDialogPlugin = {
    install:(app: App) => {
        app.config.globalProperties.$showLoginDialog = () => {
            // 创建vue的实例对象
            // const dialogApp = createApp(loginDialog)
            // // 挂载到DOM中
            // const dom = document.createElement('div')
            // document.body.appendChild(dom)
            // dialogApp.mount(dom)
            if(!dialogElement) {
                // 创建vue的实例对象
                dialogInstance = createApp(loginDialog)
                // 挂载到DOM中
                dialogElement = document.createElement('div')
                document.body.appendChild(dialogElement)
                dialogInstance.mount(dialogElement)
            }
            onUnmounted(()=>{
                if(dialogInstance && dialogElement) {
                    dialogInstance.unmount()
                    document.body.removeChild(dialogElement)
                    dialogElement = null
                    dialogInstance = null
                }
            })
        }
        app.config.globalProperties.$hideLoginDialog = () => {
            if(dialogInstance && dialogElement) {
                dialogInstance.unmount()
                document.body.removeChild(dialogElement)
                dialogElement = null
                dialogInstance = null
            }
        }
    }
}
export default loginDialogPlugin