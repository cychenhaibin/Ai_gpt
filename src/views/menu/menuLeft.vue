<script setup lang="ts">
import {ref} from "vue";
import img1 from '@/assets/image/menu/dialogue.png'
import img2 from '@/assets/image/menu/interview.png'
import img3 from '@/assets/image/menu/programmer.png'
import {useRouter} from "vue-router";
import {useUserStore} from '@stores/useUserStore.ts'
let userStore = useUserStore()
let router = useRouter();
import { useChatStore } from '@/stores/useChatStore'
let useChat = useChatStore()
const btn = (id:number) => {
  if(id) useChat.menuId = id
  useChat.isMenuRightOpen = true
  router.push({
    path:'/chat'
  })
}
const menuList = ref([
  {id:1,image:img1,text:'智能对话'},
  {id:2,image:img2,text:'模拟面试'},
  {id:3,image:img3,text:'程序员'}
])

let isShow = ref(false)
const loginOut = () => {
  userStore.removeUserInfo()
  router.push('/')
}
// 账号设置
const userConfig = () => {
  router.push('/userConfig')
  isShow.value = false
}
import {getCurrentInstance,ComponentInstance} from "vue";
let {proxy} = getCurrentInstance() as ComponentInstance;

const login = ()=>{
  proxy.$showLoginDialog()
}
</script>

<template>
<div>
  <div class="menu-header">
    <div class="menu-img">
      <div class="menu-logo">
        <img src="../../assets/image/menu/logo.png" alt="" />
      </div>
      <div class="menu-ai">
        AiGPT
      </div>
    </div>
    <div class="menu-list">
      <div class="menu-item" v-for="item in menuList" :key="item.id" @click="btn(item.id)" :style="selectedId === item.id ? { backgroundColor: '#f2f2f2' } : {}">
        <img :src="item.image" alt="" />
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
  <div class="login" v-if="userStore.userState">
    <div class="tip">隐私政策</div>
    <div class="login-btn" @click="isShow = true">
      <img :src="userStore.userInfo.logo" alt=""/>
      <span>{{ userStore.userInfo.nickName }}</span>
    </div>

    <div class="loginList" v-show="isShow">
      <div class="setting" @click="userConfig">账号设置</div>
      <div class="exit" @click="loginOut">退出登录</div>
    </div>

  </div>

  <div class="login" v-else>
    <div class="tip">隐私政策</div>
    <div class="login-btn" @click="login">
      <img src="@image/login/p.png" alt=""/>
      <span>登 录</span>
    </div>
  </div>
</div>
</template>

<style scoped>
.menu-img{
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu-logo{
    width: 50px;
    height: 50px;
    margin: 25px 0 0 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .menu-ai{
    font-weight: bold;
    font-size: 30px;
    height: 25px;
    margin: 25px 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.menu-list{
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu-item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 45px;
    margin-top:18px;
    cursor: pointer;
    border-radius: 30px;
    img {
      width: 16px;
      height: 16px;
    }
    p{
      margin-left: 8px;
      color: #333;
      font-size:16px;
      text-align: center;
      line-height: normal;
    }
  }
  .menu-item:hover{
    background: #f2f2f2
  }
}
.login {
  cursor: pointer;
  position: absolute;
  bottom: 40px;
  text-align: center;
  .login-btn{
    line-height: normal;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 40px;
    color: #fff;
    border-radius: 24px;
    background: #C90000;
    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    span{
      margin-left: 10px;
      font-weight: 400;
      color: #fff;
      text-align: center;
      font-size: 20px;
    }
  }
  .tip {
    margin-bottom: 10px;
    color: #C90000;
    font-size: 18px;
  }
}
</style>