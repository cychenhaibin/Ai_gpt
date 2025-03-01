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

export interface IChatListItem {
    assistantId:null,
    created:string,
    dateType:string,
    id:number,
    identity:null,
    occupation:null,
    question:string,
    technology:null,
    type:number,
    updated:string,
    userId:number,
    workTime:null
}
export interface IChatListData extends IRes{
    data:IChatListItem[]
}
//查询用户提问会话列表
export const chatList = (data:{
    userId:number,
    type:string,
    functionType:number
})=>{
    return http.get<IChatListData>('/api/xlx-chat/chat/list',data)
}

export interface IChatMessageItem{
    id: number;
    createUser: string; // 聊天人
    createTime: string; // 聊天时间
    chatId: number; // 回话ID
    messageId: string; // 聊天ID
    parentMessageId: string; // 回复记录ID
    model: string;
    content: string; // 聊天内容
    contentType: string; // 内容格式
    role: string; // 聊天角色  USER为用户本身  system为系统回答
    finishReason: string;
    status: number; // 聊天状态  1 回复中 2正常 3 失败
    usedTokens: number;
}
export interface IChatMessageItemData extends IRes{
    data:IChatMessageItem[]
}
//智能对话-聊天记录
export const chatMessageList = (data:{
    chatId:number
})=>{
    return http.get<IChatMessageItemData>('/api/xlx-chat/chatMessage/list',data)
}

export interface chatUpdateData extends IRes{
    data:string
}
//删除提问助手
export const chatDelete = (data:{
    ids:string
})=>{
    return http.get<chatUpdateData>('/api/xlx-chat/chat/delete',data)
}

//删除提问助手
export const chatUpdate = (data:{
    id:string,
    question:string
})=>{
    return http.post<chatUpdateData>('/api/xlx-chat/chat/update',data)
}