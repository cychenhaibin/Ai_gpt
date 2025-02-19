// 路由导航守卫
import {useUserStore} from "@stores/useUserStore.ts";
import {ElMessage} from "element-plus";
import router from "@router";
export const beforeEach = (to:any, from:any, next:any) => {
    let userStore = useUserStore().userState
    if(!userStore){
        if(to.fullPath != '/'){
            ElMessage({
                message: '请先登录',
                type: 'warning',
            })
            router.app.config.globalProperties.$showLoginDialog()
        }
        next(false)
    }else{
        next()
    }
}

export const afterEach = (to:any) => {
    console.log('houzhi')
}