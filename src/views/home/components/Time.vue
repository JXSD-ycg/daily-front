<script setup>

import {ref, onMounted, onUnmounted} from "vue";

const date = new Date();

const hour = ref(date.getHours());
const min = ref(date.getMinutes());
const sec = ref(date.getSeconds());

const timer = setInterval(
    () => {
      let date1 = new Date();
      hour.value = date1.getHours()
      min.value = date1.getMinutes()
      sec.value = date1.getSeconds()
      date1 = null;
    }
    , 1000
)

onMounted(() => timer)
onUnmounted(() => clearInterval(timer))
</script>


<template>

  <div class="border-y-2 total-text-color flex items-center justify-center text-xl font-bold py-5">
    距离明天还有: {{ 23 - hour }}小时{{ 60 - min }}分钟{{ 60 - sec }}秒
  </div>

</template>

<style scoped>

</style>