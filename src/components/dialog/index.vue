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
    background-color: #000;
    opacity: .7;
}
.container{
    width: 615px;
    height: 590px;
    background: #FFFFFF;
    border-radius: 40px 40px 40px 40px;
    position: absolute;
    z-index: 100000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .exit {
        width: 100%;
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: right;

        .exit-btn {
            width: 25px;
            height: 25px;
            cursor: pointer;
            margin-right: 38px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    footer{
        position: absolute;
        bottom: 20px;
        right: 20px;
    }
}
</style>