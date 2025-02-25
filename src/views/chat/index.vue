<template>
    <div class="chat">
        <div class="chat-messages">
            <el-input
                type="textarea"
                v-model="messages"
                style="flex:1"
                @compositionstart='handleStart'
                @compositionend="handleEnd"
                @keydown.enter.prevent="handleEnter"
            ></el-input>
            <div class="messages-right">
                <button class="messages-btn" @click="sendMessage">
                    <img src="@/assets/dialog/sending.png" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
let messages = ref('')
const compsing = ref(false)
const handleStart = ()=>{
    compsing.value = true
    console.log('开始')

}
const handleEnd = ()=>{
    compsing.value = false
    console.log('结束')
}
const handleEnter = ()=>{
    if( !compsing.value ){
        console.log('发送消息')
        messages.value = ''
    }
}
interface INewMessage{
    role:string
    content:string
    contentType:string
}
import {useUserStore} from '@stores/useUserStore'
let store = useUserStore()
const token = store.token
const {userId} = store.userInfo
//会话id
let id = ref(0)
import {chatSave} from '@api/chat'
//获取会话id
onBeforeMount(async()=>{
    let res = await chatSave({
        userId,
        type:1
    })
    console.log('会话id',res)
})
//发送消息
const newMessageList = ref<INewMessage[]>([]) 
const sendMessage = ()=>{
    if( !compsing.value ){
        console.log('发送消息')
        //输入的内容不能为空
        //判断余额是否为0
        //输入内容：发送消息
        let len = newMessageList.value.length
        newMessageList.value[len] = {
            role:'user',
            content:messages.value,
            contentType:'text'
        }
        //把输入框清空
        messages.value = ''
        //返回消息
        initEventSource()
    }
}

//处理数据
const initEventSource = async ()=>{
    //定义Header
    let headers= {
        'Content-type':'application/json'
    }
    //添加token
    if(token){
        headers['Authorization'] = token
    }
    //发送请求
    // let res = await fetch('/api/xlx-chat/chatMessage/sendMessage',{
    //     headers,
    //     method:'POST',
    //     body:JSON.stringify({
    //         id,
    //         userId,
    //         question,
    //     })
    // })
  console.log(res,111)
}
</script>

<style lang="scss" scoped>
.chat{
    flex-grow: 1;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: relative;
    background: #f2f2f2;
    .chat-messages{
        position: absolute;
        left: 3vw;
        right: 3vw;
        bottom: 2vw;
        box-sizing: border-box;
        background: white;
        display: flex;
        align-items: center;
        resize: none;
        height: auto;
        min-height: 24px;
        max-height: 200px;
        border-radius: 5px;
        ::v-deep .el-textarea__inner{
            box-shadow: none;
        }
        .messages-right{
            width: 50px;
            height: 100%;
            position: relative;
            .messages-btn{
            width: 50px;
            height: 50px;
            background: transparent;
            border: none;
            cursor: pointer;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                right: 10px;
                width: 22px;
                height: 20px;
            }
        }
        }
        
    }
}
</style>