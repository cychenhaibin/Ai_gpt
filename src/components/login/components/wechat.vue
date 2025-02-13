<script setup lang="ts">
import {onMounted,ref} from "vue";
onMounted(() => {
  // 创建script标签
  let scDom = document.createElement('script');
  scDom.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
  document.body.appendChild(scDom)
  scDom.onload = () => {
    new WxLogin({
      id: "code",
      appid: "",
      scope: "",
      redirect_uri: "",
      state: "",
      style: "",
      href: ""
    })
  }
})
</script>

<template>
<div class="code"></div>
</template>

<style scoped>

</style>