<script setup lang="ts">
import loginModal from '@components/login/loginModal.vue'
import {ref} from 'vue'
const isModal = ref(false)
const showIsModal = () => {
  isModal.value = true
}
</script>

<template>
  <div class="container">
    <div class="left">
      <div>Ai_gpt</div>
      <div class="login">
        <div>隐私政策</div>
        <div class="login-btn" @click="showIsModal">
          <img src="@image/login/p.png" alt=""/>
          <span>登录</span>
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
    background: green;
    .login {
      cursor: pointer;
      position: absolute;
      bottom: 40px;
      .login-btn{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 38px;
        color: #fff;
        border-radius: 19px;
        background: #c90009;
        img{
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        span{
          margin-left: 10px;
          font-weight: 400;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
  .right {
    flex: 1;
    background: red;
  }
}
</style>
