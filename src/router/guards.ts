import {useUserStore} from '@stores/useUserStore'
import  router from '@router'
export const beforeEach = (to:any,from:any,next:any)=>{
    console.log('前置导航守卫')
    let state = useUserStore().userState
    // if(!userStore){
    //     console.log('用户未登录',to)
    //     if( to.fullPath != '/' ){
    //         router.app.config.globalProperties.$showLoginDialog()
    //     }
    //     next(false)
    // }else{
    //     next()
    // }
    if(state){
        next()
    }else{
        if(to.fullPath != '/'){
            router.app.config.globalProperties.$showLoginDialog()
            next(false)
        }else{
            next()
        }
    }
}

export const afterEach = (to:any)=>{
    console.log('后置导航守卫')
}