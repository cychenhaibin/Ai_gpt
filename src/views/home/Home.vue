<script setup lang="ts">
import loginModal from '@components/login/loginModal.vue'
import {ref,onMounted,watch} from 'vue'
import {getInfo} from '@api/user.ts'
import {useUserStore} from '@stores/useUserStore.ts'
let userStore = useUserStore()
const isModal = ref(false)
const showIsModal = () => {
  isModal.value = true
}
// onMounted(()=>{
//   displayUrlParams()
// })
// const displayUrlParams = () => {
//   const urlParams = new URLSearchParams(window.location.search)
//   const token = urlParams.get('token')
// }
watch(() => window.location.href,async (newUrl, oldUrl)=>{
  const urlParams = new URLSearchParams(window.location.search)
  // 从地址中获取token
  const token = urlParams.get('token')
  if(token){
    localStorage.setItem('token',token)
    // 获取用户信息
    let res:any = await getInfo()
    // 保存用户信息到store
    userStore.setUserInfo(res.data)
  }
},{immediate:true})
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
      text-align: center;
      .login-btn{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 38px;
        color: #fff;
        border-radius: 19px;
        background: #7eb9f9;
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
