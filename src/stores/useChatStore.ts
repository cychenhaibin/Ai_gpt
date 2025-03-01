import { defineStore } from 'pinia'

export const useChatStore = defineStore('chatId', {
    state: (): {
        menuId:number,
        isMenuRightOpen:boolean
    } => {
        return {
            menuId:0,
            isMenuRightOpen:false
        }
    },
    actions: {
        toggleMenuRight(){
            this.isMenuRightOpen = !this.isMenuRightOpen
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage, //默认是session
                paths: ['menuId','isMenuRightOpen']
            }
        ]
    }
})
