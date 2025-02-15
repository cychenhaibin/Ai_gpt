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
        setUserInfo(info:IUserInfo){
            this.userInfo = info;
            this.userState = true
        },
        removeUserInfo(){
            this.userInfo = {};
            this.userState = false
        }
    },
    persist:{
        enabled:true,
        strategies: [
            {
                storage: localStorage,
                path: ['userInfo', 'userState'],
            }
        ]
    }
})
