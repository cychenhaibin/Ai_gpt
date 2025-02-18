<template>
  <div class="give">
    <div class="content">
      <div class="give_title">
        <h4>额度介绍</h4>
      </div>
      <!-- 额度列表，循环展示每个充值套餐 -->
      <div class="list">
        <div class="list_item" v-for="item in giveList" :key="item.id">
          <div class="list_content">
            <!-- 套餐图标 -->
            <div class="species">
              <img src="@/assets/image/recharge/species.png" alt="">
            </div>
            <!-- 套餐信息文本 -->
            <div class="text">
              <p class="tokens">{{ item.tokensTitle }}</p>
              <p class="unit">价格</p>
              <p class="unit_price">
                <span class="price">{{ item.price }}</span>
                <span class="currency">元</span>
              </p>
            </div>
            <!-- 立即购买按钮，点击后显示支付弹窗 -->
            <button class="buy_button" @click="showPayment(item)">立即购买</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 支付弹窗 -->
    <div class="payment" v-show="isShow">
      <div class="payment_content">
        <div class="exit">
          <div class="exit-btn" @click="hidePayment">
            <img src="@/assets/image/login/exit.png" alt="">
          </div>
        </div>
        <div class="select">
          <p>请选择支付方式</p>
        </div>
        <div class="payment_method">
          <div class="payChat"
               v-for="item in paymentList"
               :key="item.id"
               @click="pamentChange(item)"
               :style="{ border: paymentActive === item.id ? !item.id ? '2px solid #28C445' : '2px solid #1296DB' : '1px solid #E0E0E0' }"
          >
            <img :src="item.img" alt="">
            <p>{{ item.label }}</p>
          </div>
        </div>
        <div class="container">
          <div class="image-container">
            <img :src="codeUrl" alt="二维码">
          </div>
          <div class="info-container">
            <p class="countdown">充值倒计时：{{ formattedTime() }}</p>
            <p class="price" >￥{{ selectedPackage.price }}<del>￥{{ selectedPackage.price
              }}</del></p>
            <p class="disclaimer">请使用“{{ payName }}”支付，充值即代表同意《<span>AiGPT用户协议</span>》</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive,onBeforeMount,onBeforeUnmount,computed } from 'vue'
import { getpackage,alipayScanPay,wxpayNative,tokensOrder } from '@api/account'

//定义充值套餐变量
let giveList = ref([])
onBeforeMount(async ()=>{
  let res:any = await getpackage()
  console.log(res)
  try{
    if(res.code != 0) return
    giveList.value = res.data
  }catch(err){
    console.log(err)
  }
})

import img1 from '@/assets/image/recharge/Alipay.png'
import img2 from '@/assets/image/recharge/WeChat.png'

//定义支付的方式
const paymentList = ref([
  {id:0,label:'微信支付',img:img2},
  {id:1,label:'支付宝支付',img:img1}
])
const payName = ref('微信支付')
//支付弹窗的属性
const isShow = ref<boolean>(false)
//选中的套餐
const selectedPackage = reactive({})
//立即购买的方法
const showPayment = (item:Object)=>{
  isShow.value = true
  item.id = 0
  //选中的商品信息
  Object.assign(selectedPackage,item)
  //默认微信支付
  getWxpay(item.id)
}
//微信支付
const orderNumber = ref<number>(0)
const getWxpay = async (id:number)=>{
  let res:any = await wxpayNative(id)
  let {codeUrl,orderNo} = res.data
  orderNumber.value = orderNo
  generateQRCode(codeUrl)
  payName.value = '微信'

}
//支付宝支付
const getAlipay = async (id:number)=>{
  let res:any = await alipayScanPay(id)
  let {codeUrl,orderNo} = res.data
  orderNumber.value = orderNo
  generateQRCode(codeUrl)
  payName.value = '支付宝'
}

//切换支付方式
const paymentActive = ref(0)
const pamentChange = (item:Object)=>{
  paymentActive.value = item.id
  if( paymentActive.value ){
    //支付宝支付
    getAlipay(selectedPackage.id as number)
  }else{
    //微信支付
    getWxpay(selectedPackage.id as number)
  }
}

//展示二维码
//生成二维码并且进行渲染
import QRCode from 'qrcode'
let codeUrl = ref('')
const generateQRCode = (url:string)=>{
  if(url){
    QRCode.toDataURL(url,(err,dataURL)=>{
      if(err){
        console.log(err)
        return
      }
      codeUrl.value = dataURL
      startTimer()
      newTimeFun()
    })
  }
}
const state = reactive({
  timer:60,
  active:false //是否正在倒计时
})
//倒计时
const formattedTime = ()=>computed(()=>{
  let minutes = Math.floor(state.timer / 60)
  let seconds = state.timer % 60
  return `${String(minutes).padStart(2,'0')}分 ${String(seconds).padStart(2,'0')}秒`
})
const orderCloseTimer = ref()
const startTimer = ()=>{
  state.timer = 60
  state.active = true
  clearInterval(orderCloseTimer.value)
  orderCloseTimer.value = setInterval(()=>{
    if( state.timer > 0 ){
      state.timer --
    }else{
      state.active = false
      closeTimer() //关闭所有定时器函数
    }
  },1000)
}

//查询订单状态
const paymentOrder = async ()=>{
  let res:any = await tokensOrder(orderNumber.value)
  let { status } = res.data
  console.log( status )
}

//短轮询查看订单状态
const paymentTimer = ref()
const newTimeFun = ()=>{
  paymentTimer.value = setInterval(paymentOrder,1000)
}

//关闭定时器
const closeTimer = ()=>{
  clearInterval(orderCloseTimer.value)
  clearInterval(paymentTimer.value)
}

//关闭组件，同时关闭定时器
const hidePayment = ()=>{
  isShow.value = false
  closeTimer()
}
</script>

<style lang="scss" scoped>
.give {
  width: 100%;
  padding: 21px 47px 40px;
  background: #fff;
  border-radius: .5vw;
  box-sizing: border-box;

  .content {
    flex: 1;

    .give_title {


      h4 {
        font-size: 18px;
        font-weight: bold;
        color:#232323;
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;

      .list_item {
        flex: 0 0 25%;
        height: 15vw;
        padding: 0 1vw 1vw 1vw;
        box-sizing: border-box;
        display: flex;

        .list_content {
          flex: 1;
          position: relative;
          padding: 0 2vw 15vw;
          border-radius: 1vw;
          border: 1px solid #E9E9E9;
          box-shadow: 0px 2vw 2vw 0.5vw rgba(145, 145, 145, 0.1216);

          .species {
            width: 5vw;
            height: 5vw;
            position: absolute;
            top: 1vw;
            right: 1vw;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .text {
            border-bottom: 0.2vw solid #EEEEEE;
            margin-bottom: 1vw;
          }

          .tokens {
            margin: 2vw 0 1vw;
            font-weight: bold;
            font-size: 1vw;
            line-height: 1vw;
            color: #333333;
          }

          .unit {
            margin-bottom: 1vw;
            font-weight: 400;
            font-size: .8vw;
            color: #999999;
          }

          .unit_price {
            margin-bottom: 1vw;

            .price {
              font-weight: bold;
              font-size: 2vw;
              color: #DC985E;
            }

            .currency {
              font-size: 1vw;
              color: #DC985E;
            }
          }

          .buy_button {
            width: 100%;
            height: 3vw;
            line-height: 3vw;
            border-radius: .2vw;
            font-size: 1.5vw;
            background: linear-gradient(180deg, #FCC994 0%, #F6A967 100%);
            color: white;
            border: none;
            cursor: pointer;
          }
        }
      }
    }
  }

  .payment {
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    bottom: 0;

    .payment_content {
      width: 50vw;
      height: 34vw;
      position: fixed;
      left: 50%;
      top: 50%;
      margin-top: -17vw;
      margin-left: -25vw;
      padding: 0 3vw 0 4vw;
      box-sizing: border-box;
      background: #FFFFFF;
      border-radius: 2vw;

      .exit {
        height: 5vw;
        display: flex;
        align-items: center;
        justify-content: right;

        .exit-btn {
          width: 2vw;
          height: 2vw;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .select {
        height: 2vw;
        display: flex;
        align-items: center;
        justify-content: left;
        margin-bottom: 2vw;

        p {
          font-weight: 400;
          font-size: 1.5vw;
          color:red;
        }
      }

      .payment_method {
        width: 100%;
        height: 6vw;
        margin-bottom: 1vw;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .Alipay {
          width: 45%;
          height: 6vw;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border-radius: 1vw;

          p {
            font-weight: 400;
            font-size: 1.5vw;
            color:red;
          }

          img {
            width: 2vw;
            height: 2vw;
            margin-right: 1vw;
          }
        }

        .payChat {
          width: 45%;
          height: 6vw;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border-radius: 1vw;

          p {
            font-weight: 400;
            font-size: 1.5vw;
            color:red;
          }

          img {
            width: 2vw;
            height: 2vw;
            margin-right: 1vw;
          }
        }
      }

      .container {
        display: flex;
        justify-content: space-between;
        //padding: .4vw;

        .image-container {
          flex: 0 0 38%;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .info-container {
          flex: 1;

          .countdown {
            height: 1.4vw;
            line-height: 1vw;
            font-weight: 400;
            font-size: 1.4vw;
            color: #BFBFBF;
            margin-bottom: 2vw;
          }

          .price {
            height: 4vw;
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 4vw;
            color:red;
            margin-right: 1vw;
            margin-bottom: 3vw;

            del {
              font-weight: 400;
              font-size: 2vw;
              color: #BFBFBF;
            }
          }

          .disclaimer {
            font-weight: 400;
            font-size: 1vw;
            color:red;

            span {
              color: red;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
