<script setup lang="ts">
import {getImageCode, loginVerification, verifyImageCode} from '@api/login.ts'
import SlideSplit from '@components/login/SlideSplit/index.vue'
import useLogin from '@hooks/useLogin.ts'
import { ElMessage } from 'element-plus'
import {reactive, ref} from "vue";
let slideShow = ref(false)
let slideInfo = reactive({
  bigImageBase64:'',
  smallImageBase64:'',
  bigHeight: 0,
  bigWidth: 0,
  smallWidth: 0,
  smallHeight: 0,

})
const form = reactive({
  phone: '',
  code: ''
})
// 获取验证码图像
const getImgCode = async () => {
  let res:any = await getImageCode({
    phone:form.phone
  })
  if(res.code === 0){
    Object.assign(slideInfo,res.data)
  }else {
    ElMessage({
      message: res.errorMessage,
      type: 'error',
    })
  }
}
// 发送验证码
const btn = async () =>{
  await getImgCode()
  if (form.phone !== ''){
    slideShow.value = true
  }
}
const onJudge = async (left:any)=> {
  let res:any = await verifyImageCode({
    movePosX:left,
    phone:form.phone
  })
  if(res.code !== 0) {
    ElMessage({
      message: res.errorMessage,
      type: 'error',
    })
    return getImgCode()
  }
  slideShow.value = false
}
import {useUserStore} from "@stores/useUserStore.ts";
let userStore = useUserStore();
// 登录
const login = async () => {
  let res:any = await loginVerification({
    phone:form.phone,
    verificationCode:form.code
  })
  if(res.code !== 0){
    ElMessage({
      message: res.errorMessage,
      type: 'error',
    })
  } else {
    const token = res.data.token;
    useLogin(token)
    ElMessage({
      message: res.errorMessage,
      type: 'success',
    })

  }
}

</script>

<template>
  <div class="phone">
    <input type="text" placeholder="请输入手机号" v-model="form.phone" />
    <div class="code">
      <input class="code-input" type="text" placeholder="请输入验证码" v-model="form.code" />
      <button @click="btn">发送验证码</button>
    </div>
    <div class="password">
      <input type="password" placeholder="请输入密码" />
    </div>
    <button class="login" @click="login">登 录</button>
  </div>
  <div class="slideSplit" v-if="slideShow">
    <SlideSplit :w="slideInfo.bigWidth"
                :h="slideInfo.bigHeight"
                :l="slideInfo.smallWidth"
                :bigImg="slideInfo.bigImageBase64"
                :smImg="slideInfo.smallImageBase64"
                :smallHeight="slideInfo.smallHeight"
                @sliderJudge="onJudge"
                @request-event="getImgCode"
    ></SlideSplit>
  </div>

</template>

<style scoped>
.phone{
  width: 100%;
  margin: 30px 0;
}
.phone input {
  width: calc(100% - 40px);
  border: 1px solid rgba(250,240,240,.8);
  padding: 11px 20px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 18px;
  background: rgba(250,240,240,.8);
}
.code-input{
  border-radius: 8px 0 0 8px;
}
.phone input:focus {
  outline: none;
}
.code {
  display: flex;
  align-items: center;
}
.code button {
  height: 100%;
  width: 200px;
  padding: 9px;
  font-size: 18px;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  background: #C90000;
  color: #fff;
  line-height: normal;
}
.login {
  margin-top: 40px;
  height: 100%;
  width: 100%;
  line-height: normal;
  padding: 11px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #C90000;
  color: #fff;
}
.slideSplit {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background: rgba(250,240,240,.8);
  border-radius: 8px;
  padding: 30px;
}
</style>