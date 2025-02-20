<script setup lang="ts">
import loginModal from '@components/login/loginModal.vue'
import {ref,onMounted,watch} from 'vue'
import {getInfo} from '@api/user.ts'
import {useUserStore} from '@stores/useUserStore.ts'
let userStore = useUserStore()
import useLogin from '@hooks/useLogin.ts'
import MenuLeft from "@views/menu/menuLeft.vue";
import {useRouter} from 'vue-router'
import router from "@router";
const isModal = ref(false)
const showIsModal = () => {
  isModal.value = true
}

watch(() => window.location.href,async (newUrl, oldUrl)=>{
  const urlParams = new URLSearchParams(window.location.search)
  // 从地址中获取token
  const token:any = urlParams.get('token')
  useLogin(token)
},{immediate:true})

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
  <div class="container">
    <div class="left">
      <menu-left></menu-left>
      <!--      登录状态-->
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
    <div class="right">
      <router-view />
<!--      <loginModal :isModal="isModal" @update:isModal="isModal=$event"></loginModal>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  .left {
    display: flex;
    justify-content: center;
    width: 200px;
    height: 100vh;
    background: #ffffff;
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
  }
  .right {
    flex: 1;
    background: #f2f2f2;
  }
}
.loginList {
  position: absolute;
  top: 25px;
  left:175px;
  width: 120px;
  height: 80px;
  background: #C90000;
  border-radius: 12px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .setting{
    cursor: pointer;
  }
  .exit{
    cursor: pointer;
  }
}
</style>
