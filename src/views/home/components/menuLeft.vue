<script setup lang="ts">
import {ref} from "vue";
// import img1 from '@/assets/image/menu/dialogue.png'
// import img2 from '@/assets/image/menu/interview.png'
// import img3 from '@/assets/image/menu/programmer.png'
import img1 from '@/assets/image/menu/p.png'
import img2 from '@/assets/image/menu/p.png'
import img3 from '@/assets/image/menu/p.png'
const menuList = ref([
  {id:1,image:img1,text:'智能对话'},
  {id:1,image:img2,text:'模拟面试'},
  {id:1,image:img3,text:'程序员'}
])
</script>

<template>
<div class="menu-header">
  <div class="menu-img">
    <div class="menu-logo">
<!--      <img src="@/assets/images/logo.png" alt="" />-->
      <img src="@/assets/image/login/p.png" alt="" />
    </div>
    <div class="menu-ai">
      AiGPT
    </div>
  </div>
  <div class="menu-list">
    <div class="menu-item" v-for="item in menuList" :key="item.id">
      <img :src="item.image" alt="" />
      <p>{{item.text}}</p>
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
    height: 50px;
    margin-top:18px;
    cursor: pointer;
    padding: 5px 0;
    background: #f2f2f2;
    border-radius: 30px;
    img {
      width: 16px;
      height: 16px;
    }
    p{
      margin-left: 8px;
      color: #333;
      font-size:20px;
      text-align: center;
    }
  }
}
</style>