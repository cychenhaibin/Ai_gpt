<template>
  <div class="chat">
    <div class="chat-content" ref="chatContent">
      <!-- 聊天记录（历史数据） -->
      <div class="chat-dialog" v-for="item in dialogueDate" :key="item.id">
        <div class="chat-head">
          <img :src="item.role === 'user' ? logo : img" alt="">
        </div>
        <div class="chat-message" :style="{'background-color':item.role=='user' ? '#f6e5db' :'#ffffff'}">
          <div class="message-item" v-if="item.role === 'user'">{{ item.content }}</div>
          <div class="message-item" v-if="item.role === 'system'" v-html="renderMarkdown(item.content)"></div>
        </div>
      </div>
      <!-- 实时对话 -->
      <div class="chat-dialog" v-for="(item,index) in newMessageList" :key="index">
        <div class="chat-head">
          <img :src="item.role === 'user' ? logo : img" alt="">
        </div>
        <div class="chat-message" :style="{'background-color':item.role=='user' ? '#f6e5db' :'#ffffff'}">
          <div class="message-item" v-if="item.role === 'user'">{{ item.content }}</div>
          <div class="message-item" v-if="item.role === 'sysytem'" v-html="renderMarkdown(item.content)"></div>
        </div>
      </div>
    </div>
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
import {nextTick, onBeforeMount, ref, watch} from 'vue'
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
const {userId,logo} = store.userInfo
import img from '@/assets/lll.png'
//会话id
let id = ref(0)
import {chatSave,IChatMessageItem,chatMessageList} from '@api/chat'
//获取会话id
onBeforeMount(async()=>{
  // let res = await chatSave({
  //     userId,
  //     type:1
  // })
  // console.log('会话id',res)
  // let {chatId} = res.data
  // id.value = chatId
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
  let res = await fetch('/api/xlx-chat/chatMessage/sendMessage',{
    headers,
    method:'POST',
    body:JSON.stringify({
      id:id.value,
      userId:userId,
      question:newMessageList.value[newMessageList.value.length - 1].content
    })
  })
  console.log('后端返回的',res.body)
  //取流数据
  if( res.status == 200 ){
    let reader = res.body?.getReader()
    let decoder = new TextDecoder('utf-8')
    let len = newMessageList.value.length
    newMessageList.value[len] = {
      role:'sysytem',
      content:''
    }
    while(true){
      const {done,value} = await reader.read()
      if(done){
        break
      }
      const chunk = decoder.decode(value,{stream:true})
      try{
        //字符串转成对象
        const parseData = JSON.parse(chunk)
        //内容提取出来
        const content = parseData.content
        //把内容读取到一起
        newMessageList.value[len].content += content.replace(newMessageList.value[len].content,'')
        //滚动高度
        scrollBottom()
      }catch(err){
        console.log(err)
      }
    }
  }
}

import md from '@utils/markdown'
const renderMarkdown = (text:any)=>{
  //使用md转换html
  return md.render(text)
}

//滚动高度
let chatContent = ref(null)
const scrollBottom = () =>{
  nextTick(()=>{
    if( chatContent.value ){
      chatContent.value.scrollTop = chatContent.value.scrollHeight
    }
  })
}
import {useRoute} from 'vue-router'
let route = useRoute()
let dialogueDate = ref([])
const getChatMessageList =async (id)=>{
  let res = await chatMessageList({
    chatId:id
  })
  console.log( '历史',res )
  dialogueDate.value = res.data
  scrollBottom()
}
//监听路由的变化，然后请求到对应的聊天记录
watch(route,()=>{
  // console.log(666666666666666,route.query.id)
  id.value = route.query.id
  newMessageList.value = []
  getChatMessageList(id.value)
},{immediate:true})

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
          width: 1.5vw;
          height: 1.5vw;
        }
      }
    }

  }
  .chat-content{
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 2vw 2vw 0 2vw;
    margin-bottom: 8vw;
    box-sizing: border-box;
    padding-bottom: 2vw;
    .chat-dialog{
      margin-bottom: 1.5vw;
      display: flex;
      .chat-head{
        margin-right: 1vw;
        img{
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
      }
      .chat-message{
        flex-grow: 1;
        overflow: hidden;
        border-radius: .5vw;
        display: flex;
        align-items: center;
        .message-item{
          white-space: pre-wrap;
          font-size: 14px;
          color: #333;
          line-height: 25px;
          margin: 10px;
        }
      }
    }
  }
}
</style>
<style>
.code-block {
  height: 2vw;
  font-size: 1vw;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: .1vw solid rgba(255, 255, 255, 0.1098);
}

.copy-button {
  margin-left: .5vw;
  border: none;
  cursor: pointer;
}

.hljs {
  display: flex !important;
  flex-direction: column;
  border-radius: .5vw;
  /* background-color: #2F3052; */
  background-color: #000;
  color: #7fb421;
  font-size: 1vw;
  padding: 0 1em 1em 1em !important;
  overflow-x: auto !important;
  margin: .5vw 0;
  font-family: Consolas, Monaco, monospace !important;
}

.code-line {
  display: block;
  height: 2vw;
  line-height: 2vw;
  position: relative;
  padding-left: 3em;
  counter-increment: line-number;
}

.code-line::before {
  content: counter(line-number);
  position: absolute;
  left: 0;
  width: 2.5em;
  padding-right: 0.5em;
  text-align: left;
  color: #888;
}

.hljs-name {

  color: #e06c75 !important;
}

.hljs-meta,
.hljs-meta .hljs-keyword,
.hljs-meta .hljs-string {
  color: #be5046 !important;
}

.hljs-attr,
.hljs-link,
.hljs-literal,
.hljs-number,
.hljs-symbol,
.hljs-variable.constant_ {
  color: #d19a66 !important;
}

.hljs-tag {
  color: #565c64 !important;
}

.hljs-addition,
.hljs-code,
.hljs-string,
.hljs-title.class_.inherited__ {
  color: #98c379 !important;
}
</style>