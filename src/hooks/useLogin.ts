import {getInfo} from '@api/user.ts'
import {useUserStore} from '@stores/useUserStore.ts'
import router from '@router'

// 用户登录成功后token保存到本地
const useLogin = async(token: string) => {
    if(token){
        // 存储token
        // localStorage.setItem('token',token)
        await useUserStore().isLogin(token)
        // 获取用户信息
        let res:any = await getInfo()
        // 保存用户信息到store
        useUserStore().setUserInfo(res.data)
        // 关闭登录框
        router.app.config.globalProperties.$hideLoginDialog()
    }
    return
}
export default useLogin