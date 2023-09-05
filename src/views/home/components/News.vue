<script setup>

import {ref, onMounted} from "vue";
import {getFinanceAPI} from "../../../apis/news.js";

// 获取节财经新闻
const news = ref([]);
const index = ref(0);
const getFinance = async () => {
  const res = await getFinanceAPI();
  // 返回的是一个列表 里面是一个一个的 vo  title:标题 content:内容
  news.value = res.data
}

const changeNews = () => {
  if (index.value === news.value.length - 1) {
    index.value = 0;
  } else {
    index.value++
  }

}


onMounted(() => getFinance())
</script>

<template>
  <div class="px-2 text-2xl text-blue-400 font-semibold py-3 flex items-center justify-center">
    <span class="">财经新闻</span>
    <div class="pl-5">
      <el-tooltip
          class="box-item "
          effect="light"
          content="点我刷新"
          placement="right-end"
      >
        <a href="#" class=" " @click="changeNews">
          <svg t="1692955296225" class=" h-8 w-8 hover:-translate-y-0.5" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" >
            <path
                d="M895.701333 391.424h-172.629333a39.850667 39.850667 0 1 1 0-79.701333h69.333333a344.490667 344.490667 0 0 0-281.813333-146.048 345.258667 345.258667 0 1 0 345.301333 345.258666 39.850667 39.850667 0 1 1 79.658667 0c0 234.666667-190.293333 424.96-424.96 424.96-234.666667 0-424.96-190.293333-424.96-424.96 0-234.666667 190.293333-424.96 424.96-424.96a423.765333 423.765333 0 0 1 345.301333 177.834667V192.213333a39.850667 39.850667 0 1 1 79.658667 0V351.573333a39.850667 39.850667 0 0 1-39.850667 39.850667z"
                fill="#1296db" p-id="4836"></path>
          </svg>
        </a>
      </el-tooltip>
    </div>

  </div>

  <div class="text-lg bg-gray-50 py-3 px-5 tracking-wide leading-relaxed flex-col items-center space-y-5 ">
    <div class="indent-8 cursor-pointer hover:text-blue-600">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="新闻来自澎湃网"
          placement="right-start"
          trigger="hover"
      >
        <p class="">{{news[index]?.title}}
          <a class="underline text-sm text-blue-600" href="https://www.thepaper.cn/finance" target="_blank">详情</a>
        </p>

      </el-tooltip>

    </div>
    <div class="">
      <p>{{news[index]?.content}}</p>

    </div>
  </div>




</template>

<style scoped>

</style>