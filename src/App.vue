<script setup lang="ts">
import loginModal from '@components/login/loginModal.vue'
import {ref,onMounted,watch} from 'vue'
import {getInfo} from '@api/user.ts'

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

// 引入按钮右侧
import menuRight from './views/menu/menuRight.vue'
</script>

<template>
  <div class="container">
    <div class="left">
      <menu-left></menu-left>
    </div>
    <menuRight></menuRight>
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
  background: #f2f2f2;
  .left {
    display: flex;
    justify-content: center;
    width: 200px;
    height: 100vh;
    background: #ffffff;

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
