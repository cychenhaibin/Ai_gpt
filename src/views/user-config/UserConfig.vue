<script setup lang="ts">
import {onBeforeMount, reactive, ref} from 'vue'
import {getpackage, alipayScanPay, tokensOrder} from '@api/account.ts'
let tabs = reactive([
  {id: 0, name:'总览'},
  {id: 1, name:'账户'},
  {id: 2, name:'充值'},
])
let packages = ref([])
onBeforeMount(async () => {
  let res:any = await getpackage()
  packages.value = res.data
})
// 引入展示二维码的插件
import QRCode from 'qrcode'
// 订单编号
let orderNo = ref('')
// 存储二维码
let imgUrl = ref('')
// 立即购买
const showPayment = async (item:any) => {
  let res:any = await alipayScanPay(item.id)
  // 展示二维码
  generateQRCode(res.data.codeUrl)
  orderNo.value = res.data.orderNo
}
const generateQRCode = (url:any) => [
    QRCode.toDataURL(url,(error,dataURL)=>{
      if(error){
        return
      }
      imgUrl.value = dataURL;
      setInterval(paymentOrder,2000)
    })
]
// 查询订单:短轮询
const paymentOrder = async() => {
  let res:any = await tokensOrder(orderNo.value)
}
</script>

<template>
  <div >
    <ul>
      <li v-for="item in tabs" :key="item.id">{{item.name}}</li>
    </ul>
    <h2>额度介绍</h2>
    <ul>
      <li v-for="item in packages" :key="item.id">
        名称：{{item.tokensTitle}}
        价格：{{item.price}}
        <button @click="showPayment(item)">立即购买</button>
      </li>
    </ul>
    <hr />
    <h2>展示二维码</h2>
    <div>
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>

<style scoped>

</style>