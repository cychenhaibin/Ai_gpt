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
  {id:1,name:'扫码登录',label:phone},
  {id:2,name:'扫码登录',label:password},
])
// let curId = ref(0)
// const tabs = (id:number)=>{
//   curId.value = id
// }
let currentIndex = ref(0)
let comp = ref(phone)
const tabs = (item:any) => {
  currentIndex.value = item.id
  comp.value = item.label
}
</script>

<template>
<teleport to="body" v-if="isModal">
  <div class="modal-backrop" @click="close"></div>
  <div class="login">
    <button @click="close">X</button>
    <ul>
      <li v-for="(item,index) in loginTabs" :key="item.id" @click="tabs(item)">{{item.name}}</li>
    </ul>
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
  width: 500px;
  height: 430px;
  background-color: white;
  border-radius: 41px;
  z-index: 1100;
  padding: 25px 0 15px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>