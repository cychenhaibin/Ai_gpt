<template>
    <div class="account-info">
        <div>
            <button class="add" @click="add">添加额度</button>
            <h2 class="t1">我的额度</h2>
            <div class="cont">
                <div class="quota_list">
                    <div class="quota_item">
                        <img src="@image/recharge/used-recharge.png" alt="">
                        <p class="used">已使用：<span>{{ AccountQuota.usedQuota }}</span></p>
                    </div>
                    <div class="quota_item">
                        <img src="@image/recharge/total-recharge.png" alt="">
                        <p class="total">总额：<span>{{ AccountQuota.totalQuota }}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h2 class="t1">记录</h2>
            <div class="scroll" ref="scrollRef">
                <!-- :style="{height: itemHeight * accountList.length + 'px'}" -->
                <div class="" :style="{height: itemHeight * accountList.length + 'px'}"></div>
                <!-- :style="{top: top + 'px'}" -->
                <div class="list-wrapper" :style="{top: top + 'px'}">
                    <!--  :style="{height: itemHeight + 'px'}" -->
                    <div class="item" v-for="item in showList" :key="item.id" :style="{height: itemHeight + 'px'}">
                        <span> {{item.serialNumber}} </span>
                        <span> {{item.consumption}} </span>
                        <span> {{item.updated}} </span>
                        <span> {{item.type ? '消耗' : '充值'}}</span>
                        <span> {{item.remarks}} </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref ,reactive,onMounted } from 'vue'
import { getAccountQuota,getAccount} from '@api/user'
import router from "@router";

//用户账户总额度
let AccountQuota = reactive({})
//用户明细
let accountList = ref([])
// 列表每一项的高度
let itemHeight = ref<number>(50);
// 当前滚动的距离
let top = ref<number>(0)
// 列表项的数量
let showNum = ref(0)
let scrollRef = ref<HTMLElement | null>(null)
// 存储当前列表展示的列表项
let showList = ref([])
//模拟的数据
let moniRes = ref([])
onMounted(async()=>{
    //模拟1000条数据
    moniRes.value = Array.from({length:1000},(_,index)=>({
        id:index + 1,
        serialNumber:`流水号：${index + 1};`,
        consumption:Math.floor(Math.random() * 100),
        updated:new Date().toLocaleString(),
        type:Math.random() >0.5 ? 1 : 0,
        remarks:`备注信息：${index + 1}`
    }))
    //请求用户账户总额度
    let res:any = await getAccountQuota()
    console.log( '用户账户总额度查询',res )
    Object.assign(AccountQuota,res.data)
    //请求用户明细
    let listRes = await getAccount({
        page:1,
        pagesize:100
    })
    // accountList.value = listRes.data.items
    accountList.value = moniRes.value
    // 计算可视区域类列表项的数量
    showNum.value = Math.ceil(parseFloat(window.getComputedStyle(scrollRef.value).getPropertyValue('height')) / itemHeight.value)
    // 初始化渲染列表.
    showList.value = accountList.value.slice(0, showNum.value)
    // 监听列表的滚动事件
    scrollRef.value?.addEventListener('scroll',handleScroll)
})
const handleScroll = (e:Event) => {
    let startIndex = Math.max(Math.floor(e.target.scrollTop / itemHeight.value), 0)
    let endIndex = Math.min(startIndex + showNum.value, accountList.value.length)
    showList.value = accountList.value.slice(startIndex, endIndex)
    top.value = startIndex * itemHeight.value
}

const emits = defineEmits(["handle-click"])
const add = () => {
  emits("handle-click",'3')
}


</script>
<style lang="scss" scoped>
.add {
  width: 114.3px;
  height: 38.7px;
  line-height: normal;
  margin-bottom: 15px;
  background: #C90000;
  border: none;
  color: #fff;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}
.account-info{
    height: 480px;
    background: #FFFFFF;
    border-radius: 8px 8px 8px 8px;
    padding: 23px 30px;
    h2.t1{
        font-family: Microsoft YaHei, Microsoft YaHei;
        font-weight: bold;
        font-size: 18px;
        color: #232323;
    }
    .cont{
        border-radius: 8px 8px 8px 8px;
        border: 1px solid #DBDBDB;
        padding: 0 28px;
    }
    .quota_list{
        display: flex;
        
        .quota_item {
            display: flex;
            align-items: center;
            margin-right: 60px;
            img {
                width: 19px;
                width: 19px;
                margin-right: 2px;
            }

            p {
                font-size: 14px;
                color: #232323;

                span {
                    &.used {
                        color: #FF3A3A;
                    }

                    &.total {
                        color: #3AB7FF;
                    }
                }
            }
        }
    }
    .scroll{
        border-radius: 8px 8px 8px 8px;
        border: 1px solid #DBDBDB;
        height: 280px;
        color: #232323;
        position: relative;
        overflow-y: scroll;
    }
    .list-wrapper{
        width: 100%;
        position: absolute;
        left: 0;
        .item{
            display: flex;
            justify-content: space-around ;
            align-items: center;
        }
    }
}
</style>