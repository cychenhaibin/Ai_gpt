<script setup lang="ts">
import {onMounted,ref} from "vue";
import {getLoginParam} from "@api/login.ts";
onMounted(() => {
  // 创建script标签
  let scDom = document.createElement('script');
  scDom.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
  document.body.appendChild(scDom)
  scDom.onload = async () => {
    let res:any = await getLoginParam()
    let {appid, redirectUri,scope,state} = res.data
    new WxLogin({
      id: "code",
      appid,
      scope,
      redirect_uri: encodeURIComponent(redirectUri),
      state,
    })
  }
})
</script>

<template>
<div id="code"></div>
</template>

<style scoped>
#code {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>