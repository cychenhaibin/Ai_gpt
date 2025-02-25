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
import { ref, computed } from 'vue';

// 开关状态
let toggleMiddle = ref<boolean>(false);

// 样式计算
const rotateValue = ref('rotate(0deg)');
const toggleStyle = computed(() => ({
    transform: `translateY(-50%) translateX(${toggleMiddle.value ? '225px' : '-10px'}) ${rotateValue.value}`
}));

// 切换内容
const toggleContent = () => {
    toggleMiddle.value = !toggleMiddle.value;
    if (toggleMiddle.value) {
        rotateValue.value = 'rotate(0deg)';
    } else {
        rotateValue.value = 'rotate(180deg)';
    }
};

//打开会话列表
import {useRouter} from 'vue-router'
let router = useRouter()
const addMiddle = ()=>{
    router.push('/chat')
}
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
    }
    .toggle{
        transition: transform .5s ease;
        position: absolute;
        top: 50%;
        width: 22px;
        height: 22px;
        cursor: pointer;
        z-index: 33;
    }
}
</style>
