<script setup lang="ts">
import {onMounted,ref} from "vue";
import {getLoginParam} from "@api/login.ts";
import {ElMessage} from "element-plus";
let scDom:HTMLScriptElement|null = null;
onMounted(() => {
  // 创建script标签
  // let scDom = document.createElement('script');

  if(!scDom){
    let scDom = document.createElement('script');
    scDom.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
    document.body.appendChild(scDom)
    scDom.onload = async () => {
      let res:any = await getLoginParam()
      if (res.code !== 0){
        ElMessage({
          message: res.errorMessage,
          type: 'error',
        })
      }else {
        let {appid, redirectUri,scope,state} = res.data
        new WxLogin({
          id: "code",
          appid,
          scope,
          redirect_uri: encodeURIComponent(redirectUri),
          state,
          href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZX0NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9DQouaW1wb3dlckJveCAucXJjb2RlIHt3aWR0aDogMjMwcHg7bWFyZ2luLXRvcDogO2JvcmRlcjogbm9uZTt9DQo='
        })
      }
    }
  }
})
</script>

<template>
  <div class="code-box">
    <div id="code"></div>
  </div>
</template>

<style scoped>
#code {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>