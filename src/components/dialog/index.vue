<template>
    <Teleport to="body" v-if="dialogVisible">
        <div class="modal-backdrop"></div>
        <div class="container">
            <header>
                <div class="exit">
                    <div class="exit-btn" @click="close">
                        <img src="@image/login/exit.png" alt="">
                    </div>
                </div>
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </div>
    </Teleport>
</template>
<script setup lang="ts">
const props = defineProps(['dialogVisible'])

const emit = defineEmits()

const close = () => {
    emit('update:dialogVisible', false)
    emit('close')
}
</script>
<style lang="scss" scoped>
.modal-backdrop{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #323232;
    opacity: .7;
}
.container{
    width: 350px;
    height: fit-content;
    padding: 0 35px 30px;
    background: #FFFFFF;
    border-radius: 12px 12px 12px 12px;
    position: absolute;
    z-index: 100000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .exit {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: right;

        .exit-btn {
            width: 18px;
            height: 18px;
            cursor: pointer;
            //margin-right: 20px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    footer{
        display: flex;
        justify-content: flex-end;
    }
}
</style>