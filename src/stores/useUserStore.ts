import { defineStore } from 'pinia'
interface IUserInfo{
    created:null | string;
    isWechat:'0' | '1';
    logo:string;
    mobile:string;
    nickName:string;
    sex:string;
    userId:Number;
}
export const useUserStore = defineStore('storeId',  {
    state:():{
        userInfo:Partial<IUserInfo>
        userState:boolean,
    }=>{
        return {
            userInfo:{},
            userState:false
        }
    },
    actions:{
        isLogin(token:string){
            if(token){
                this.token = token
            }
        },
        setUserInfo(info:IUserInfo){
            if (token){
                this.userInfo = info;
                this.userState = true
            }
        },
        removeUserInfo(){
            this.userInfo = {};
            this.userState = false
            this.token = ''
        }
    },
    persist:{
        enabled:true,
        strategies: [
            {
                storage: localStorage,
                path: ['userInfo', 'userState', 'token'],
            }
        ]
    }
})
