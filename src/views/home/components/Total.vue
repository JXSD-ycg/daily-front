<script setup>

import {onMounted, ref} from "vue";
import {getSentenceAPI, getTotalInfoAPI} from "../../../apis/total.js";

let i = ref(0)
const warm = ref([]);
const list = ref([]);


const getSentence = async () => {
  const res = await getSentenceAPI();
  warm.value = res.data
  console.log(warm.value[1].content)
}

const changeSentence = () => {
  if (i.value === 9) {
    i.value = 0
  } else {
    i.value++
  }
}

const getTotalInfo = async () => {
  const res = await getTotalInfoAPI();
  list.value = res.data
}
onMounted(() => {
      getSentence()
      getTotalInfo()
    }
)

</script>

<template>
  <p class="font-semibold text-2xl total-text-color py-1  border-b-2 mb-3">每日一句</p>
  <div class="flex-col total-color w-auto h-auto py-3 justify-around rounded ">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start px-5 total-text-color text-xl font-bold w-full">
        {{ warm[i]?.content }}
      </div>
      <el-tooltip
          class="box-item"
          effect="light"
          content="点我刷新句子"
          placement="top-end"
      >
        <a href="#" class="pt-3 pr-5 " @click="changeSentence">
          <svg t="1692955296225" class=" h-8 w-8 hover:-translate-y-0.5 " viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" >
            <path
                d="M895.701333 391.424h-172.629333a39.850667 39.850667 0 1 1 0-79.701333h69.333333a344.490667 344.490667 0 0 0-281.813333-146.048 345.258667 345.258667 0 1 0 345.301333 345.258666 39.850667 39.850667 0 1 1 79.658667 0c0 234.666667-190.293333 424.96-424.96 424.96-234.666667 0-424.96-190.293333-424.96-424.96 0-234.666667 190.293333-424.96 424.96-424.96a423.765333 423.765333 0 0 1 345.301333 177.834667V192.213333a39.850667 39.850667 0 1 1 79.658667 0V351.573333a39.850667 39.850667 0 0 1-39.850667 39.850667z"
                fill="#1296db" p-id="4836"></path>
          </svg>
        </a>
      </el-tooltip>

    </div>

  </div>

  <div class="flex-col total-color w-auto h-auto py-3 mt-2 justify-around rounded ">
    <div class=" px-5 total-text-color font-bold"> 此时已有 {{ list[0] }} 位朋友创建了 {{ list[1]}} 本日记, 写下了 {{ list[2] }} 个秘密</div>
  </div>


</template>

<style scoped>

</style>