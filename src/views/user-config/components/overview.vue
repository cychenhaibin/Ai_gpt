<template>
<div>
    <div class="overview">
        <div class="avatar-section">
            <p class="t1">头像</p>
            <img src="@image/recharge/WeChat.png" alt="用户头像">
        </div>
        <!-- <input style="visibility: hidden;" ref="avatarInput" type="file" @change="uploadImage"> -->
        <div ></div>
        <div class="binding-section">
            <div class="binding-title">
                <p class="t1">账号绑定</p>
                绑定手机号和微信，账号更安全且登录方便; 为保证账号安全，绑定账号需进行二次验证.
            </div>
            <div class="binding-options">
                <div class="binding-option">
                    <img src="@image/recharge/Bind-WeChat.png" alt="绑定微信">
                    <p>{{`绑定微信：${userStore.userInfo.isWechat == 0? '未绑定' : '已绑定'}`}}</p>
                    <p class="binding-operate" @click="openDialog" v-show="userStore.userInfo.isWechat == 0">绑定</p>
                </div>
                <!-- <div class="binding-option">
                    <img src="@img/recharge/Bind-phone.png" alt="更改密码">
                    <p>{{`密码：********`}}</p>
                    <p class="binding-operate" @click="passwordDialogShow = true">修改</p>
                </div>
                <div class="binding-option">
                    <img src="@img/recharge/Cancel-account.png" alt="注销账户">
                    <p>{{`注销账号 您的账号一旦被注销成功将不可恢复`}}</p>
                    <p class="binding-operate" @click="logoutDialogShow = true">注销</p>
                </div> -->
                
            </div>
        </div>
    </div>
    
    <!--  换wx -->
    <AIdialog v-model:dialogVisible="dialogVisible" @close="close">
        <div id="code"></div>
    </AIdialog>
    <!-- 换手机号 -->
    <!-- <AIdialog v-model:dialogVisible="passwordDialogShow">
        <div id="code">
            使用手机号：{{userStore.userInfo.mobile}}
        </div>
        <div>
            <button @click="sendCode">发送验证码</button>
            验证码：<input type="number" v-model="msgCode" />
            <el-button @click="checkCode">验证</el-button>

            <div>
                输入密码：<input type="password" v-model="password"/>
                再次输入密码： <input type="password" v-model="againPassword" />
            </div>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="submit">修改</el-button>
            </span>
        </template>
    </AIdialog> -->
    <!-- 注销 -->
    <!-- <AIdialog v-model:dialogVisible="logoutDialogShow">
        <div id="code">
            是否确认注销
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="logoutDialogShow = false">取消</el-button>
                <el-button type="primary" @click="logoutSubmit"
                >确认</el-button
                >
            </span>
        </template>
    </AIdialog> -->
</div>
</template>
<script setup lang="ts">
import { getLoginParam } from '@api/login'
// import { loginReginfoHead, sendCheckCode, modifyPasswordVerification, modifyPassword, userLogout } from '@api/user'

import {  ref, onUnmounted  } from 'vue';
import { useUserStore } from '@/stores/useUserStore'
// import Password from '@/components/comp/password.vue';

const userStore = useUserStore()


const dialogVisible = ref<boolean>(false)
let scDom: HTMLScriptElement | null = null

const openDialog = ()=> {
    if( !scDom ){
        //创建script标签
        scDom = document.createElement('script')
        scDom.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
        document.body.appendChild(scDom)
        scDom.onload = async ()=>{
            // console.log('是否添加成功')
            let res = await getLoginParam()
            console.log('获取微信参数',res)
            let { appid,redirectUri,scope,state } = res.data
            new WxLogin({
                // self_redirect:true,
                id:"code", 
                appid, 
                scope, 
                redirect_uri: encodeURIComponent(redirectUri),
                state,
                href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZX0NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9DQouaW1wb3dlckJveCAucXJjb2RlIHt3aWR0aDogMjMwcHg7bWFyZ2luLXRvcDogO2JvcmRlcjogbm9uZTt9DQo='
            });
        }
    }
    dialogVisible.value = true

}

const close = ()=>{
console.log('关闭事件')
}
</script>
<style scoped lang="scss">
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
        font-size: 15px;
        color: #232323;
        margin-right: 8px;
    }
    .avatar-section{
        display: flex;
        align-items: center;
        margin-bottom: 40px;
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
            font-size: 12px;
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
</style>