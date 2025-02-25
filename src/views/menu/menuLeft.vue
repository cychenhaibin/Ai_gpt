<script setup lang="ts">
import {ref} from "vue";
import img1 from '@/assets/image/menu/dialogue.png'
import img2 from '@/assets/image/menu/interview.png'
import img3 from '@/assets/image/menu/programmer.png'
import {useRouter} from "vue-router";
let router = useRouter();
let selectedId = ref(0)
const btn = (id:number) => {
  router.push('/test')
  selectedId.value = id
}
const menuList = ref([
  {id:1,image:img1,text:'智能对话'},
  {id:2,image:img2,text:'模拟面试'},
  {id:3,image:img3,text:'程序员'}
])
</script>

<template>
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
</style>