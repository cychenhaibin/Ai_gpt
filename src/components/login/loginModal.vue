<script setup lang="ts">
import {ref,defineProps,defineEmits} from 'vue'
import wechat from '@components/login/components/wechat.vue'
import phone from '@components/login/components/phone.vue'
import password from '@components/login/components/password.vue'

const props = defineProps ({
  isModal:{
    type: Boolean,
    default:false
  }
})
const emit = defineEmits(['update:isModal'])
const close = () => {
  emit('update:isModal', !props.isModal)
}
let loginTabs = ref([
  {id:0,name:'扫码登录',label:wechat},
  {id:1,name:'验证码登录',label:phone},
  {id:2,name:'密码登录',label:password},
])
// let curId = ref(0)
// const tabs = (id:number)=>{
//   curId.value = id
// }
let currentIndex = ref(0)
let comp = ref(wechat)
const tabs = (item:any) => {
  currentIndex.value = item.id
  comp.value = item.label
}
</script>

<template>
<teleport to="body" v-if="isModal">
  <div class="modal-backrop" @click="close"></div>
  <div class="login">
    <div class="top">
      <div class="close" @click="close">
        <img src="@/assets/image/login/exit.png" alt="" />
      </div>
      <div class="tab">
        <ul>
          <li v-for="(item,index) in loginTabs" :key="item.id" @click="tabs(item)" :class="{ active: currentIndex === index }">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <component :is="comp"></component>
  </div>
</teleport>
</template>

<style scoped>
.modal-backrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.7;

}
.login{
  position: fixed;
  width: 400px;
  height: 430px;
  background-color: white;
  border-radius: 20px;
  z-index: 1100;
  padding: 25px 40px 15px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
ul li {
  list-style: none;
  cursor: pointer;
}
.close {
  display: flex;
  justify-content: flex-end;
}
.close img {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.close button {
  padding: 2px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.tab {
  margin-top: 20px;
  background: rgba(250,240,240,.8);
  border-radius: 8px;
}
.tab ul {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
.tab ul li {
  list-style: none;
  cursor: pointer;
  padding: 10px; /* 添加一些内边距，使背景色看起来更明显 */
  transition: background-color 0.3s ease; /* 添加过渡效果 */
  flex: 1; /* 每个子项平分父容器 */
  text-align: center; /* 可选：让内容居中 */
  line-height: normal;
}
.tab ul li:hover {
  background: #fbe3e3;

  border-radius: 8px;
}
.tab ul li.active { /* 定义激活状态的样式 */
  background-color: #C90000; /* 蓝色背景 */
  border-radius: 8px;
  color: white; /* 文字颜色为白色 */
  line-height: normal;
}

</style>