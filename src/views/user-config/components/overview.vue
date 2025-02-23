<template>
<div>
    <div class="overview">
        <div class="avatar-section">
            <p class="t1">头像</p>
            <!-- @img/recharge/WeChat.png -->
            <img :src="userStore.userInfo.logo" alt="用户头像" @click="selectImage">
        </div>
        <input style="visibility: hidden;" ref="avatarInput" type="file" @change="uploadImage">
        <div ></div>
        <div class="binding-section">
            <div class="binding-title">
                <p class="t1">账号绑定</p>
                <p class="t2">绑定手机号和微信，账号更安全且登录方便; 为保证账号安全，绑定账号需进行二次验证.</p>
            </div>
            <div class="model-one">
              <div class="binding-options">
                <div class="binding-option">
                  <img src="@image/recharge/Bind-WeChat.png" alt="绑定微信">
                  <p>{{`绑定微信：${userStore.userInfo.isWechat == 0? '未绑定' : '已绑定'}`}}</p>
                  <p class="binding-operate" @click="openDialog" v-show="userStore.userInfo.isWechat == 0">绑定</p>
                </div>
                <hr style="border-top: 1px solid #ccc" />
                <div class="binding-option">
                  <img src="@image/recharge/Bind-phone.png" alt="更改密码">
                  <p>{{`绑定手机号：${userStore.userInfo.mobile}`}}</p>
                  <p class="binding-operate" @click="phoneDialogShow = true">更换</p>
                </div>
              </div>
            </div>
          <div class="binding-title">
            <p class="t1">密码设置</p>
            <p class="t2">设置密码，账号更安全; 为保证账号安全，设置密码需进行二次验证。</p>
          </div>
          <div class="model-one">
            <div class="binding-options">
              <div class="binding-option">
                <img src="@image/recharge/password.png" alt="更改密码">
                <p>{{`密码：********`}}</p>
                <p class="binding-operate" @click="passwordDialogShow = true">修改</p>
              </div>
              <hr style="border-top: 1px solid #ccc" />
              <div class="binding-option">
                <img src="@image/recharge/Cancel-account.png" alt="注销账户">
                <p>{{`注销账号 您的账号一旦被注销成功将不可恢复`}}</p>
                <p class="binding-operate" @click="logoutDialogShow = true">注销</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    
    <!--  换wx -->
    <AIdialog v-model:dialogVisible="dialogVisible" @close="close">
        <div id="codewx"></div>
    </AIdialog>
<!--    换手机号-->
  <AIdialog v-model:dialogVisible="phoneDialogShow">
    <div>
      <div class="identify">修改手机号</div>
      <div class="explain">
        <p>为了保护您得账号安全，请验证身份 验证成功后进行下一步操作</p>
      </div>
      <div id="code">
        使用手机号：{{userStore.userInfo.mobile}}
      </div>
      <div>
        <div class="msgCode password">
          <input type="text" v-model="phone" class="msgCode-input" placeholder="输入新手机号" />
        </div>
        <div class="msgCode tel">
          <input type="text" v-model="msgCodeTel" class="msgCode-input" placeholder="短信验证码" />
          <button @click="btn">发送验证码</button>
        </div>
        <el-button @click="submitCode" class="checkCode">验 证</el-button>
      </div>
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
  </AIdialog>
    <!-- 换密码 -->
    <AIdialog v-model:dialogVisible="passwordDialogShow">
        <div v-show="!showCode">
          <div class="identify">身份验证</div>
          <div class="explain">
            <p>为了保护您得账号安全，请验证身份 验证成功后进行下一步操作</p>
          </div>
          <div id="code">
            使用手机号：{{userStore.userInfo.mobile}}
          </div>
          <div>
            <div class="msgCode tel">
              <input type="text" v-model="msgCode" class="msgCode-input" placeholder="短信验证码" />
              <button @click="sendCode">发送验证码</button>
            </div>
            <el-button @click="checkCode" class="checkCode">验 证</el-button>
          </div>
        </div>

      <div v-show="showCode">
        <div class="identify">密码设置</div>
        <div class="explain">
          <p>设置密码，账号更安全;</p>
          <p>为保证账号安全，设置密码需进行二次验证</p>
        </div>
        <div id="code">密码</div>
        <div>
          <div class="msgCode password">
            <input type="password" v-model="password" class="msgCode-input" placeholder="输入密码" />
          </div>
          <div class="msgCode password">
            <input type="password" v-model="againPassword" class="msgCode-input" placeholder="再次输入密码" />
          </div>
          <div class="closeLogin" @click="logoutDialogShow = true">注销账号</div>
        </div>
        <div class="dialog-footer">
          <el-button @click="submit" class="checkCode">修改</el-button>
        </div>
      </div>
    </AIdialog>
    <!-- 注销 -->
    <AIdialog v-model:dialogVisible="logoutDialogShow">
        <div id="code">是否确认注销</div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="logoutDialogShow = false">取消</el-button>
                <el-button type="primary" @click="logoutSubmit">确认</el-button>
            </span>
        </template>
    </AIdialog>
</div>
</template>
<script setup lang="ts">
import {getLoginParam, getImageCode, verifyImageCode} from '@api/login'
import {
  loginReginfoHead,
  sendCheckCode,
  modifyPasswordVerification,
  modifyPassword,
  userLogout,
  modifyPhone, sendModifyphoneCheckCode
} from '@api/user'
import {ref, onUnmounted, reactive} from 'vue';
import { useUserStore } from '@/stores/useUserStore'
import {ElMessage} from "element-plus";
import SlideSplit from '@components/login/SlideSplit/index.vue'
// import Password from '@/components/comp/password.vue';

const userStore = useUserStore()


const dialogVisible = ref<boolean>(false)
let scDom: HTMLScriptElement | null = null

const openDialog = async () => {
   // 先清掉，再创建
   if(scDom){
       document.body.removeChild(scDom as Node)
       scDom = null
   }
   // 创建
   scDom = document.createElement('script')
   // src引用
   scDom.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
   // 添加到body里
   document.body.appendChild(scDom)
   // 实例化 ====> scDom.load里，保证这个script元素加载完成的状态
   scDom.onload = async ()=> {
       // 参数进行说明，对照wx官方文档
       let res:any = await getLoginParam()
   //    if(res.code != 0) return
   let { appid, redirectUri, scope, state } = res.data
       var obj = new WxLogin({
           // self_redirect:true,
           id: "codewx",
           appid,  
           scope, 
           redirect_uri: decodeURIComponent(redirectUri),
           state,
           href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZX0NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9DQouaW1wb3dlckJveCAucXJjb2RlIHt3aWR0aDogMjMwcHg7bWFyZ2luLXRvcDogO2JvcmRlcjogbm9uZTt9DQo='
       });
   }
   
   dialogVisible.value = true
}

const close = ()=>{
    dialogVisible.value = false
    if(scDom){
        document.body.removeChild(scDom)
        scDom = null
    }
}

//更改头像
const avatarInput = ref<HTMLElement | null>(null)
const selectImage = ()=>{
    avatarInput.value && avatarInput.value.click()
}
//头像上传
const uploadImage =async (e:Event)=>{
    let formData = new FormData()
    formData.append('file',avatarInput.value.files[0])
    let res:any = await loginReginfoHead(formData)
    if( res.code == 0 ){
        userStore.getInfo()
    }
}

//修改密码
const passwordDialogShow = ref<boolean>(false)
const msgCode = ref<string>('')
const phoneDialogShow = ref<boolean>(false)
const password = ref<string>('')
const againPassword = ref<string>('')
const phone = ref<string>('')
// const verificationCode = ref<string>('')
const msgCodeTel = ref<string>('')
// const passwordDialogShow = ()=>{

// }
const showCode = ref(false)
//发送验证码（密码）
const sendCode = async ()=>{
    let res:any = await sendCheckCode()
    if(res.code == 0){
      ElMessage.success('验证码已发送')
    } else {
      ElMessage.warning(res.errorMessage)
    }
}
//验证
const checkCode = async ()=>{
    let res:any = await modifyPasswordVerification(msgCode.value)
    if (res.code == 0){
      showCode.value = true
    }
}
//修改密码
const submit = async ()=>{
    if( password.value === againPassword.value ){
        let res:any = await modifyPassword(password.value,password.value)
        console.log('是否修改成功',res)
        if( res.code == 0 ){
            passwordDialogShow.value = false
            ElMessage.success('修改成功')
        }else {
            ElMessage.warning(res.errorMessage)
        }
    }
}

//发送验证码（手机号）
let slideShow = ref(false)
let slideInfo = reactive({
  bigImageBase64:'',
  smallImageBase64:'',
  bigHeight: 0,
  bigWidth: 0,
  smallWidth: 0,
  smallHeight: 0,

})
// 获取验证码图像
const getImgCode = async () => {
  let res:any = await getImageCode({
    phone:phone.value,
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
const btn = async () =>{
  await getImgCode()
  if (phone.value !== ''){
    slideShow.value = true
  }
}
const onJudge = async (left:any) => {
  let res:any = await sendModifyphoneCheckCode(phone.value,left)
  if(res.code == 0){
    ElMessage.success('验证码已发送')
  } else {
    ElMessage.warning(res.errorMessage)
    return getImgCode()
  }
  slideShow.value = false
}
//修改手机号
const submitCode = async ()=>{
  let res:any = await modifyPhone(phone.value,msgCodeTel.value)
  if( res.code == 0 ){
    phoneDialogShow.value = false
    ElMessage.success('修改成功')
    userStore.getInfo()
  }else{
    ElMessage.warning(res.errorMessage)
  }
}

//注销
const logoutDialogShow = ref<boolean>(false)
const logoutSubmit = async ()=>{
    let res:any = await userLogout()
    if(res.code == 0){
        userStore.removeUserInfo()
    }
}


</script>
<style scoped lang="scss">
#codewx{
  display: flex;
  justify-content: center;
  height: 250px!important;
}
.model-one {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 12px 24px;
}
.overview {
    width: 100%;
    height: 100%;
    padding: 20px 30px;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    font-family: Microsoft YaHei, Microsoft YaHei;
    font-size: 14px;
    .t1{
        font-weight: bold;
        font-size: 16px;
        color: #232323;
        margin-right: 8px;
    }
    .avatar-section{
        display: flex;
        align-items: center;
        img{
            width: 79px;
            height: 79px;
            border-radius: 50%;
            cursor: pointer;
            margin-left: 30px;
        }
    }
    .binding-section {
        .binding-title {
            // width: 100%;
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #989898;
        }
        .binding-option{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img{
                width: 23px;
                height: 19px;
                margin-right: 8px;
            }
            .binding-operate{
                margin-left: auto;
                color: #C90000;
                cursor: pointer;
            }
        }
    }
}
#code {
  height: 30px;
}
.identify{
  width: 100%;
  text-align: center;
  font-weight: 400;
  font-size: 27.2px;
  color: #232323;
  margin-bottom: 10px;
}
.explain{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
  p {
    width: 272px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #6b6b6b;
    margin: 0!important;
  }
}
.msgCode {
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #e4e4e4;
  .msgCode-input{
    border: none!important;
    outline: none;
    line-height: normal;
  }
  button{
    border: none!important;
    background: none;
    line-height: normal;
    color: #C90000;
    cursor: pointer;
  }
}
.tel{
  display: flex;
  justify-content: space-between;
}
.password{
  margin-bottom: 20px;
}
.checkCode {
  width: 100%;
  height: 40px;
  border: none;
  margin-top: 30px;
  background: #C90000;
  cursor: pointer;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 20px;
  line-height: normal;
}
.closeLogin {
  color: #C90000;
  cursor: pointer;
  font-size: 14px;
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