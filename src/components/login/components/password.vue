<template>
  <!-- 密码登录 -->
  <div class="password">
    <div class="input">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item class="phone" prop="mobile">
          <el-input class="deepInput" v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item class="message" prop="password">
          <el-input class="deepInput" show-password type="password" v-model="loginForm.password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
<!--      <div class="forget">-->
<!--      </div>-->
      <div class="login-btn">
        <el-button type="danger" @click="userBtn(loginFormRef)">登录/注册</el-button>
      </div>
      <div class="agreement">
        <div>
          <el-checkbox class="deepcheck"
                       v-model="agreed">登录即代表你同意《<span>鹿线AI用户协议</span>》</el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import {ElMessage} from 'element-plus'

import { userLogin } from '@api/login'
import useLogin from '@hooks/useLogin'
import router from "@router";

const loginFormRef = ref()
// 登录表单值
const loginForm = reactive({
  mobile: '',
  password: ''
})
// 表单规则
const rules = reactive({
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
  ]
});
// 协议
const agreed = ref<boolean>(false)

// 登录
const userBtn = async (formEl: any) => {
  //检查用户是否同意协议
  if(!agreed.value){
    ElMessage.warning('请同意用户协议')
    return
  }
  //表单验证
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      //发送请求提示信息
      let res:any = await userLogin(loginForm)
      if( res.code == 0 ){
        ElMessage({
          message: res.errorMessage,
          type: 'success',
        })
        router.app.config.globalProperties.$hideLoginDialog()
        // ElNotification({
        //   showClose:true,
        //   message:res.errorMessage,
        //   type:'success'
        // })
      }else{
        ElMessage({
          message: res.errorMessage,
          type: 'error',
        })
        // ElNotification({
        //   showClose:true,
        //   message:res.errorMessage,
        //   type:'error'
        // })
      }
      let { token } = res.data
      useLogin(token)
    } else {
      //提示信息
      console.log('serror submit',fields)
    }
  })
}
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner{
  font-size: 18px;
}
::v-deep .el-form {
  margin-top: 45px;
}
::v-deep .el-input__wrapper {
  height: 40px;
  background: rgba(250, 240, 240, 0.8)!important;
  box-shadow: none!important;
}
.password {
  .input {
    .phone {
      position: relative;
      // height: 4vw;
      display: flex;
      border-radius: 11px;
      align-items: center;
      margin-bottom: 30px;
      background: rgba(250, 240, 240, 0.8);
    }


    .message {
      position: relative;
      // height: 4vw;
      border-radius: 11px;
      display: flex;
      align-items: center;
      // margin-bottom: 1vw;
      background: rgba(250, 240, 240, 0.8);
    }
  }

  .button {

    .forget {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: right;
      margin-bottom: 15px;

      p {
        font-size: 15px;
        color: #232323;

      }
    }

    .login-btn {
      //height: 52px;
      margin-bottom: 20px;
      border-radius: 11px;

      .el-button {
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
    }

    .agreement {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        display: flex;
        align-items: center;
        justify-content: center;

        input {
          width: 12px;
          height: 12px;
          // margin-right: .4vw;
          // cursor: pointer;
        }

        .el-checkbox {
          font-weight: 400;
          font-size: 14px;
          color: #232323;

          span {
            cursor: pointer;
            color: #C90000;
          }
        }
      }

    }
  }
}
</style>