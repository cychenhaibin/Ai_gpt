import { defineStore } from 'pinia'


import {getInfo} from '@api/user'

import router from '@router'

export const useUserStore = defineStore('storeId', {
    state:():{
        userInfo:any;
        userState:any
        token:any
    }=>{
        return {
            userInfo:{},
            userState:false,
            token:''
        }
    },
    actions:{
        isLogin(token:string){
            if(token){
                this.token = token
            }
        },
        setUserInfo(info:any){
            if(this.token){
                this.userInfo = info
                this.userState = true
            }
        },
        // 退出登录
        removeUserInfo(){
            this.userInfo = {}
            this.userState = false
            this.token = ''
            router.replace({path:'/'})
        },
        async getInfo(){
            let res:any = await getInfo()
            this.setUserInfo(res.data)
        }
    },
    persist:{
        enabled:true,
        strategies: [
            {
                storage: localStorage, //默认是session
                paths: ['userInfo','token','userState']
            }
        ]
    }
})
