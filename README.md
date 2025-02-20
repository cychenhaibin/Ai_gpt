# AiGPT

## 第一天

### 一、布局

1. #### 响应式布局

   media媒体查询(多个设计图：多套样式) flex

2. #### 自适应布局

   淘宝：淘宝无限适配js + rem（像素单位） px to rem

   rem：相对于html根元素节点上font-size值来确定

   京东：vw vh

3. #### 涉及面试题：

   1. 你怎么做的媒体查询布局
   2. flex布局的理解（主轴、侧轴、水平垂直、flex:1）
   3. 响应式和自适应的区别？

### 二、项目的技术栈

构建工具：vite

JS:TS vue3

本地存储：localstorage

接口文档：http://doc.xuexiluxian.cn/web/#/item/index 【鹿线Ai】

账号：testapi  密码：123465

### 三、搭建AI项目

#### 3.1 创建项目

​		npm init vue@latest

​		执行三行命令

​		cd demo

​		cnpm install

​		npm run dev

#### 3.2 整理原始项目文件

​	main.ts：删掉第一行CSS的引入

​	App.vue：只留下<RouterView />

​	router文件

​		index.ts:路由主入口文件

​		routes.ts:路由表

​		guards.ts:路由导航守卫

【你们的路由是否做过处理？】

​	这个路由拆分可做可不做，做的主要目的是为了后期好维护。

​	配置@路径

​	'@': fileURLToPath(new URL('./src', import.meta.url)),

​	'@views': fileURLToPath(new URL('./src/views', import.meta.url)),

​	'@components': fileURLToPath(new URL('./src/components', import.meta.url)),

​	'@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),

​	'@router': fileURLToPath(new URL('./src/router', import.meta.url))

​	@短路径红线问题

​	tsconfig.app.json进行配置：

```json
"paths": {
	"@/*": ["./src/*"],
	"@*": ["./src/*"],
}
```

​	pinia的相关问题

​	【pinia和vuex有什么区别？pinia为什么比vuex快？】

​		vuex：state,computed,mutation,actions,modules（模块化）

​		pinia：state,computed,actions

​	工具类文件 utils

​			创建utils - reuqest.ts 文件

​			封装axios

​			下载 cnpm i axios -S

​			初始化axios内容

```js
import axios from 'axios'

const request = axios.create({
    baseURL: 'https://some-domain.com/api/'
});

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default request
```

            创建接口api文件，目的解耦

## 第二天

### 四、验证码登录

1. #### 配置跨域

   ```js
   server:{
      proxy:{
      	  '/api':{
            target:'http://39.100.86.70:8088/',
            changeOrigin:true,
            rewrite:path=>path.replace(/^\/api/,'')
         }
      }
   }
   ```

   注意：修改了vite.config.ts的内容后，项目要重启

2. #### 切记要注释掉request.ts文件中的baseURL

3. #### 验证码

​		点击“发送验证码”按钮，成功以后请求到的数据是滑块组件的数据

​		滑块组件滑动成功后（把小图片滑动到对应位置），发送请求验证码的接口

4. #### 补充的内容：axios二次封装内对于get post的封装

   ```js
   const http = {
           get(url,params,config){
               return new Promise((resolve,reject)=>{
                   request.get(url,{params,...config})
                   .then((res)=>{
                       resolve(res.data)
                   })
                   .catch((error)=>{
                       reject(error)
                   })
               })
           },
           post(url,data,config){
               return new Promise((resolve,reject)=>{
                   request.post(url,data,config)
                   .then((res)=>{
                       resolve(res.data)
                   })
                   .catch((error)=>{
                       reject(error)
                   })
               })
           }
       }
   ```

5. #### 接口前面需要加上：/api/xlx-sso

6. #### 验证码登录

   收引入SlideSplit插件

   然后通过getImageCode接口获取到插件所需的数据

   在onJudge事件内传递参数，判断用户是否滑动成功，如果成功就请求loginVerification给手机号发送验证码

7. #### 微信扫码登录

   文档：https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html

   1. 注册微信开放平台
      回调域：用户扫码（微信登录二维码） - 微信接收到用户扫码的状态，告诉后端 - 后端来操作用户的登录行为

   2. 申请成功后，两个比较重要的参数
      AppId  appSecret

   3. 项目的做法

      1. 创建script标签

      2. 给script标签的src属性添加连接
      3. 把script标签加到body里
      4. 实例化 微信登录 的对象

## 第三天

### 五、扫码登录

[扫码登录原理](https://www.bilibili.com/video/BV1jX4y1Q7Xg?spm_id_from=333.788.videopod.sections&amp;vd_source=9a5ba74ac5239c7e876e35b22f7f762a "扫码登录原理")

请求后台获取微信登录的接口，拿到数据，传给微信登录对象

当用户扫码成功，地址会发生改变（携带了token...信息）

用户扫码之后的逻辑

路由发生了变化 => watch来监听路由的变化（有变化就表示扫码成功）=> 从地址中解构出所需要的参数token =>拿到token就可以请求用户的信息

### 六、TS补全

TS 抽时间补一下 是JS类型的超集

ts文件是不能被运行的，运行前会先把它转成js执行

js是弱类型语言  ts是强类型语言

多个同名的interface是否会合并？会

ts配置

​	"composite": true,
​	"noUnusedParameters": false,
​	"verbatimModuleSyntax": false,

### 七、登录成功之后的操作

1. 成功以后获取token

2. 保存token（localstorage,cookie）

3. 获取用户的信息（请求获取用户信息的接口需要传token）

4. 保存在store里，方便后期其他页面使用（持久化存储）
   【面试题】

   0. lcoalstorage存的数据都是字符串

   1. lcoalstorage sessionstorage cookie 区别？

   2. localstorage存数据，超出存储容量最大值怎么办？

      用第三方库，对数据进行压缩 lz-string

      ​	cnpm i lz-string -S

      ​	import LZString from 'lz-string'

      ​	localStorage.setItem('a',LZString.compress('123456'))

      ​	console.log(localStorage.getItem('a').length)

      ​	优点：节省空间；缺点：我要安装第三方

      使用indexedDB
      	可以用别人封装好的库：cnpm i localforage -S

      ```js
      localforage.config({
         name:'store',
         storeName:'mystore'
      })
      localforage.setItem('arr',[1,2,3,4]).then(()=>{
         console.log('成功')
      })
      localforage.getItem('arr').then(val => console.log(val))
      ```

      ​	优点：存储量大；缺点：操作比较麻烦，兼容可能不是很好

5. 持久化存储

   cnpm i pinia-plugin-persist -S

   main.ts:

   ```ts
   import PiniaPluginPersist from 'pinia-plugin-persist'
   const store = createPinia()
   store.use(PiniaPluginPersist)
   app.use(store)
   ```

   useUserStore：

   ```js
   persist:{
      enabled:true,
      strategies: [
         {
            storage: localStorage, //默认是session
            paths: ['userInfo'] //你要持久化存储的数据
         }
      ]
   }
   ```

## 第四天

### 八、登录后的操作

1. 在扫码页面登录成功后，Home.vue页面保存用户信息

2. 验证码登录页面，保存用户信息

3. 封装hooks（vue2是mixins混入）

   问题：hooks和mixins有什么区别？  可以让代码复用的函数

   当有多个组件可以共享相同逻辑的时候，就可以考虑封装hooks

### 九、整理首页布局

面试：vue中key值的作用是什么？除了v-for里用key以外，哪里还可以使用？

左侧顶部布局的调整 menuLeft组件内容

登录框的简单样式调整

### 十、登录按钮的切换

Home.vue页面登录按钮根据用户不同的登录状态，显示不同的内容

当用户登录成功后，点击可以显示右侧的小列表

退出登录的 按钮的事件

## 第五天

### 十一、账号设置里的支付

1. 添加账号设置的路由

2. 开始做充值内容

   1. 请求到充值套餐（四个）

   2. 请求支付宝支付的接口，把套餐对应的id传过去

   3. 此时就可以获取到二维码地址和订单号

   4. 展示二维码

      qrcode插件（npm i qrcode -S）

      ```js
      const generateQRCode = (url:any) => [
          QRCode.toDataURL(url,(error,dataURL)=>{
            if(error){
              return
            }
            imgUrl.value = dataURL;
            setInterval(paymentOrder,2000)
          })
      ]
      ```

      拿到地址给img

   5. 通过订单号查询用户支付的状态

      用短轮询写的方式去实现，也就是通过定时器不断的去请求订单查询接口

3. 支付订单查询方式

   短轮询：本质就是每隔一段时间去向后端发送一次请求，后端知道订单状态，不会主动通知前端，所以前端才需要不断的去询问后端状态

   webSocket（长链接）：是一种单个TCP连接上进行全双工通信的协议。连接一旦建立，前后端双方可以主动给对方发消息

   【面试常问】告诉面试官查询的方式是短轮询，面试官会问除了短轮询还有什么方式可以实现？能否优化短轮询（给个定时做短时间的刷新，时间过期后二维码失效）；

   1. 心跳机制：500毫秒（设置）前后端交互一次（发送非常小的数据）
   2. 断线重连

## 第六天

### 十二、调整页面的布局

​    1.把Home.vue页面的所有内容，放进App.vue中

​        记得把引入文件的路径改一下

​    2.在main.ts中引入noemalize.css

​    3.在src创建menu文件，移动menuLeft.vue

​    4.问题：登录按钮对用户登录的状态不确定

​    5.补充右侧页面的内容、渲染tab切换及动态组件

### 十三、完善充值组件的内容

​    1.请求充值套餐的接口，渲染套餐卡片

​    2.立即购买 事件打开支付弹窗，默认会请求微信的支付数据

​    3.支付方式的切换（切换了就会更换支付的数据，主要就是用支付方式的id）

​        获取到对应支付方式的codeUrl和orderNo

​    4.拿到codeUrl去用qrcode库生成二维码

​        orderNo是发送请求查询订单状体，并且使用短轮询

​        后端返回订单的状态（前端可以根据状态去做不同的事：一事支付成功就会进入账户记录日志；二是支付失败就可以提示用户重新支付）
​        订单设置有效期

​            在获取到二维码的时候，就可以开始倒计时

​            在订单倒计时内要用短轮询去查看订单状态

​        停止倒计时：

​            1.订单超时

​            2.支付成功

​            3.支付失败

​            4.关闭/退出当前组件的时候

​        停止后可以重新获取二维码

## 第七天

### 十四、登录

1. 如果用户没有登录，那么在进入一些页面的时候，应该弹出登录框

   路由导航守卫中实现，判断用户的登录正泰，如果没有登录，就弹出弹出框

   现在是用自定义属性控制组件的显示，接下来用插件实现这个功能

2. 把登录框封装成插件

   简单使用：loginDialogPlugin：index.ts 和 loginDialog.vue

   index.ts

   ```js
   // 封装登录框逻辑
   import {App} from 'vue'
   const loginDialogPlugin = {
       install:(app: App) => {
           app.config.globalProperties.$showLoginDialog = () => {
               alert(111)
           }
       }
   }
   export default loginDialogPlugin
   ```

   在main.ts中进行引入使用

   真正的弹出登录框

   ​		把之前登录框loginDialog.vue的内容全部复制到loginDialog.vue页面中

3. 账号密码登录

4. 调整用户的登录状态

   1. 修改userUserStore.ts中的类型
   2. 修改action中的方法
   3. 修改hooks中useLogin.ts关于存token的内容
   4. 修改请求拦截器中关于token的代码

5. 判断用户登录状态显示登录框

   1. 在router-index.ts中引入登录框插件以及绑定给router对象
   2. 在guards.ts中引入router对象，接着判断用户的登录状态、以及用户要去的路由，最后显示登录框

## 第八天

### 十五、添加隐藏登录框的方法

​    在 登录成功后 调用隐藏方法（hooks）

​    问题：叉号关闭 解决：

```js
import router from '@router'
const close = ()=>{
	router.app.config.globalProperties.$hideLoginDialog()
}
```

### 十六、调整 微信扫码登录 的变量设置

### 十七、整理目录

       1. 原components - login - components中的三个文件，直接放进上级目录中

​	   删除 components 和 loginModal.vue

​       注意：修改lognDialog.vue中对应文件的引入

    2. 修改 App.vue 页面中登录按钮的事件

        1. 因为登录框已经做了封装，所以原来调用登录框的方法都作废

        2. 删掉原引入的登录框组件、给登录按钮添加点击事件

        3. 引入vue实例然后通过实例调用$showLoginDialog()

           ```js
           import {getCurrentInstance,ComponentInternalInstance} from 'vue'
           let { proxy } = getCurrentInstance() as ComponentInternalInstance
           const login = ()=>{
               proxy.$showLoginDialog()
           }
           ```

    3. 调整App.vue页面的内容

        把登录结构部分全部复制到menuLeft.vue中

        再把相关的JS和CSS也复制过来

### 十八、账户功能

​    【添加额度】

​    【充值页面，用户充值成功后，跳转到 账户 页面进行显示】

1. 写请求的接口

2. 发送请求，并渲染数据

   ```js
   //用户账户总额度
   let AccountQuota = reactive<Partial<IaccountQuotaData>>({})
   //用户明细
   let accountList = ref<IAccountItem[]>([])
   onMounted(async()=>{
       //请求用户账户总额度
       let res = await getAccountQuota()
       console.log( '用户账户总额度查询',res )
       Object.assign(AccountQuota,res.data)
       //请求用户明细
       let listRes = await getAccount({
           page:1,
           pagesize:100
       })
       console.log( '用户明细',listRes )
       accountList.value = listRes.data.items
   })
   ```

3. 虚拟列表













