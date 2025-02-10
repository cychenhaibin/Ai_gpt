
import { defineStore } from 'pinia'
import {useUserStore} from "@stores/counter.ts";

export const useStore = defineStore('storeId',  {
    state:() => {
        return {
            a:useUserStore
        }
    }
})
