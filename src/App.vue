<template>
  <RouterView />
</template>
<script setup>
import {useUserStore} from '@stores/counter'
let userStore = useUserStore()
console.log(userStore.a)
import {useStore} from '@stores/index'
let userStore2 = useUserStore()
console.log(userStore2.a)
</script>