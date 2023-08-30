<script setup>

import {defineProps} from "vue";

defineProps({
 user:{
   type:Object,
   default: () => {}
 }
})

</script>

<template>
<div class="bg-gray-100 min-h-full w-5/6 mx-4 px-5 pb-5 space-y-2">
  <img class="py-3 px-3 w-60 h-60 border" :src="user.image">
  <span class=" text-sm">{{user.username}} 于 {{new Date(user.createTime).toLocaleDateString()}} 加入</span>
  <div >
    <p class="">自我介绍:</p>
    <p class="text-sm font-light tracking-wide indent-5">{{user.introduce === '' ? '这个人什么也没写' : user.introduce}}</p>
  </div>

</div>
</template>

<style scoped>

</style>