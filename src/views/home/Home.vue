<script setup lang="ts">
import loginModal from '@components/login/loginModal.vue'
import {ref,onMounted,watch} from 'vue'
import {getInfo} from '@api/user.ts'
import {useUserStore} from '@stores/useUserStore.ts'
let userStore = useUserStore()
import useLogin from '@hooks/useLogin.ts'
import MenuLeft from "@views/home/components/menuLeft.vue";
import {useRouter} from 'vue-router'
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
  // route.push('/')
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
          <div class="setting">账号设置</div>
          <div class="exit" @click="loginOut">退出登录</div>
        </div>

      </div>

      <div class="login" v-else>
        <div class="tip">隐私政策</div>
        <div class="login-btn" @click="showIsModal">
          <img src="@image/login/p.png" alt=""/>
          <span>登 录</span>
        </div>
      </div>

    </div>
    <div class="right">
    <loginModal :isModal="isModal" @update:isModal="isModal=$event"></loginModal>
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
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 48px;
        color: #fff;
        border-radius: 24px;
        background: #7eb9f9;
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
        color: #7eb9f9;
        font-size: 20px;
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
  top: -23px;
  left:200px;
  width: 120px;
  height: 80px;
  background: #7eb9f9;
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
