<template>
  <div class="account">
    <h1 class="title">账号设置</h1>
    <div class="tip">禁止发送色情、暴力、政治等敏感信息!违者封号!</div>
    <div class="recharge_list">
      <div class="account-title">
        <div class="title_item"
             v-for="item in rechargeList"
             :key="item.id"
             @click="setRechargeMethod(item)"
             :class="{active:rechargeIndex === item.id}"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <!-- 动态组件 -->
    <component :is="comp"></component>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import payMent from './components/payment.vue'
import accountInfo from './components/accountInfo.vue';
import overview from './components/overview.vue';

const rechargeList = ref([
  {id:'1',text:'总览',comp:overview},
  {id:'2',text:'账户',comp:accountInfo},
  {id:'3',text:'充值',comp:payMent}

])
const rechargeIndex = ref('1')
const comp = ref(overview)
const setRechargeMethod = (item:Object) =>{
  comp.value = item.comp
  rechargeIndex.value = item.id
}
</script>

<style lang="scss">
.account {
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
  background-color: #F2F2F2;
  padding: 38px 48px;
  font-family: Microsoft YaHei, Microsoft YaHei;

  .title {
    font-size: 25px;
    color: #232323;
    position: relative;
    padding-left: 16px;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      content: '';
      display: inline-block;
      width: 4px;
      height: 23px;
      background: #C90000;
      border-radius: 3px;
    }
  }

  .tip {
    height: 38px;
    line-height: 40px;
    background: #FFF7F7;
    border-radius: 7px 7px 7px 7px;
    border: 1px solid #C90000;
    font-size: 18px;
    color: #C90000;
    margin-top: 18px;
    padding-left: 13px;
  }

  .account-title {
    flex: 1;
    display: flex;
    align-items: center;

    .title_item {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: left;
      font-size: 22px;
      color: #232323;
      margin: 38px 90px 30px 0;

      &.active {
        color: #C90000;
      }
    }
  }

  .recharge {
    background-color: #fff;
    margin-top: 30px;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;

    .recharge-item {
      width: 300px;
      background: #FFFFFF;
      box-shadow: 0px 5 5px 1px rgba(145, 145, 145, 0.1216);
      border-radius: 9px 9px 9px 9px;
      border: 1px solid #C90000;
      margin-right: 33px;
      padding: 40px 33px;
      margin-bottom: 33px;
    }
  }
}
</style>