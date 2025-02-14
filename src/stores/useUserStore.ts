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
    }=>{
        return {
            userInfo:{}
        }
    },
    actions:{
        setUserInfo(info:IUserInfo){
            this.userInfo = info;
        }
    },
    persist:{
        enabled:true,
        strategies: [
            {
                storage: localStorage,
                path: ['userInfo']
            }
        ]
    }
})
