<template>
  <div class="inner">
    <Transition name="slide">
      <div class="middle" v-show="toggleMiddle">
        <div class="middle-create">
          <div class="middle-create-btn" @click="addMiddle">
            <img src="@/assets/middle/jiahao.png" alt="">
            <p>创建会话</p>
          </div>
        </div>
        <div class="middle-main">
          <div class="middle-list">
            <div class="today">今天</div>
            <div class="middle-item"
                 v-for="item in todaySessions"
                 :key="item.id"
                 @click="tanChang(item.id)"
                 :class="{'active':iconIndex == item.id}"
            >
              <div class="middle-text" v-show="!isEditing(item.id)">
                <img src="@/assets/middle/dialogue.png" alt="">
                <span>{{ item.question }}</span>
              </div>
              <div class="middle-icon" v-if="iconIndex == item.id" v-show="!isEditing(item.id)">
                <img src="@/assets/middle/edit.png" alt="" @click="showEdit(item.id)">
                <img src="@/assets/middle/delete.png" alt="" @click="deleteData(item.id)">
              </div>
              <div class="middle-editer" v-show="isEditing(item.id)">
                <input type="text" v-model="item.question">
                <img src="@/assets/middle/edit.png" alt="" @click="editData(item.id,item.question)">
              </div>
            </div>
          </div>
        </div>
        <!-- 余额 -->
        <div class="middle-footer">
          <div class="middle-btn">
            <div class="middle-money">
              <img src="@/assets/middle/money.png" alt="">
              <p>余额<span>{{ AccountQuota.currentBalance }}</span></p>
            </div>
            <p class="middle-recharge">充值</p>
          </div>
        </div>
      </div>
    </Transition>
    <!-- oncontextmenu：禁用右键菜单；ondragstart：禁止拖拽 -->
    <div class="toggle"
         @click="toggleContent"
         ref="toggleRef"
         :style="toggleStyle"
         oncontextmenu="return false"
         ondragstart="return false"
    >
      <img src="@/assets/middle/retract.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, reactive, onMounted } from 'vue';

// 开关状态
// let toggleMiddle = ref<boolean>(false);
let toggleMiddle = computed(()=>useChat.isMenuRightOpen)


// 样式计算
const rotateValue = ref('rotate(0deg)');
const toggleStyle = computed(() => ({
  transform: `translateY(-50%) translateX(${toggleMiddle.value ? '225px' : '-10px'}) ${rotateValue.value}`
}));

// 切换内容
const toggleContent = () => {
  // toggleMiddle.value = !toggleMiddle.value;
  useChat.toggleMenuRight()
  if (toggleMiddle.value) {
    rotateValue.value = 'rotate(0deg)';
  } else {
    rotateValue.value = 'rotate(180deg)';
  }
};

//打开会话列表
import {useRouter,useRoute} from 'vue-router'
let router = useRouter()
let route = useRoute()
const addMiddle = async ()=>{
  // router.push('/chat')
  let res = await chatSave({
    userId,
    type:1
  })
  console.log('会话id',res)
  let {chatId} = res.data
  getChatList()
  router.push({
    path:'/chat',
    query:{
      id:chatId
    }
  })
  // id.value = chatId
}

import { chatList,IChatListItem,chatDelete,chatUpdate,chatSave } from '@api/chat'
//打开右侧后，请求会话列表
onBeforeMount(()=>{
  getChatList()
})
import { useUserStore } from '@stores/useUserStore'
const store = useUserStore()
let {userId} = store.userInfo
import { useChatStore } from '@/stores/useChatStore'
let useChat = useChatStore()
let todaySessions = ref<IChatListItem[]>([])
let oldSessions = ref<IChatListItem[]>([])
const getChatList =async ()=>{
  let res = await chatList({
    userId:userId,
    type:'3',
    functionType:useChat.menuId
  })
  // console.log('会话列表',res)
  // dateType:1是今天的数据，2是最近的数据
  // iconIndex.value = res.data[0].id
  todaySessions.value = res.data.filter((item) => item.dateType == 1)
  oldSessions.value = res.data.filter((item) => item.dateType == 2)
  const currentId = parseInt(route.query.id?.toString() || '0')
  if(  todaySessions.value.some(item => item.id == currentId) ){
    iconIndex.value = currentId
  }else{
    iconIndex.value = todaySessions.value[0]?.id || '0'
  }


}

//切换会话
let iconIndex = ref(0)
const tanChang = (id:number) => {
  router.push({
    path:'/chat',
    query:{
      id:id
    }
  })
  iconIndex.value = id
}

//删除事件
import {throttle} from '@utils/tool'
const deleteData = throttle(async (id)=>{
  let res = await chatDelete({ids:id})
  console.log('删除',res)
  if(res.code != 0) return
  await getChatList()
  router.push({
    path:'/chat',
    query:{
      id:iconIndex.value
    }
  })
},300)


//修改会话框
//会话的编辑状态 需要存多个编辑状态
let editingStatus = reactive<any>({})
const isEditing = (id:string)=>{
  return !!editingStatus[id]
}
//切换编辑状态   保证其他会话的编辑状态关闭
const showEdit = (id:string)=>{
  console.log(editingStatus[id])
  if(!editingStatus[id]){
    editingStatus[id] = false
  }
  editingStatus[id] = !editingStatus[id]
  Object.keys(editingStatus).forEach((key)=>{
    if( parseInt(key) !== id ){
      editingStatus[key] = false
    }
  })
}
//修改会话标题
const editData = async (id:string,question:string) => {
  let res =await chatUpdate({id,question})
  console.log('修改',res)
  if(res.code != 0) return
  Object.keys(editingStatus).forEach((key)=>{
    editingStatus[key] = false
  })
}

//查询余额
import {type IaccountQuotaData, getAccountQuota} from '@api/user'
//用户账户总额度
let AccountQuota = reactive<Partial<IaccountQuotaData>>({})
onMounted(async ()=>{
  let res = await getAccountQuota()
  // console.log('余额查询',res)
  Object.assign(AccountQuota,res.data)
})

</script>

<style lang="scss" scoped>
.inner{
  position: relative;
  height: 100%;
  .middle{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #f8f8fa;
    width: 238px;
    height: 100%;
    .middle-create{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      .middle-create-btn{
        width: 190px;
        height: 40px;
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        background: #c90000;
        border-radius: 10px;
        margin: 10px 0 30px;
        img{
          width: 18px;
          height: 18px;
          margin-right: 10px;
        }
        p{
          line-height: normal;
        }
      }
    }
    .middle-main{
      width: 200px;
      flex-grow: 1;
      overflow-y: auto;
      .middle-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .today{
          width: 200px;
          height: 36px;
          display: flex;
          justify-content: left;
          align-items: center;
          font-size: 16px;
          color: #817f7f;
        }
        .middle-item{
          width: 200px;
          height: 50px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          background: #fff;
          border: 1px solid #fff;
          box-sizing: border-box;
          border-radius: 10px;
          cursor: pointer;
          .middle-text{
            display: flex;
            justify-content: space-around;
            align-items: center;
            img{
              width: 18px;
              height: 18px;
              margin: 0 10px;
            }
            span{
              font-weight: 400;
              font-size: 16px;
              color: #664a4a;
            }
          }
          .middle-icon{
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 16px;
              height: 16px;
              margin-right: 9px;
            }
          }
          &.active{
            border: 1px solid #cf0606;
          }
          .middle-editer{
            display: flex;
            align-items: center;
            input {
              width: 70%;
              padding-left: 20px;
              border: none;
            }
            input:focus {
              outline: none;
            }
          }
        }
      }
    }
    .middle-footer{
      .middle-btn{
        width: 200px;
        height: 51px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        background: #fff;
        border-radius: 8px;
        margin-bottom: 20px;
        .middle-money{
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 18px;
            height: 18px;
            margin: 0 10px;
          }
          p{
            font-size: 16px;
          }
        }
        .middle-recharge{
          margin: 0 10px;
          cursor: pointer;
          color: #c90000;
        }
      }
    }
  }
  .toggle{
    transition: transform .5s ease;
    position: absolute;
    top: 50%;
    width: 22px;
    height: 22px;
    cursor: pointer;
    z-index: 120;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
