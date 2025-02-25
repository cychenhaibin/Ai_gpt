import http from "@/utils/request";
import type{IRes} from '@/interface/index'

interface chatSaveData extends IRes{
    data:{
        chatId:number
    }
}

//新建提问助手 获取会话id
export const chatSave = (data:object)=>{
    return http.post<chatSaveData>('/api/xlx-chat/chat/save',data)
}