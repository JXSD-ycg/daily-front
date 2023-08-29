<script setup>

import {ref, onMounted} from "vue";
import {getLoginUserDailyAPI} from "../../apis/userHome.js";

import UserBox from "./components/UserBox.vue";
import UserDaily from "./components/UserDaily.vue";


// 从session中获取登录用户信息
const loginUserInfo = JSON.parse(sessionStorage.getItem("loginUserInfo"))

// 根据用户id查询 改用户下面的所有 public文章
const list = ref([]);
const total = ref(0);
const userId = ref(0);

// 查询日记
const getLoginUserDaily = async () => {
  const res = await getLoginUserDailyAPI(1, 7,loginUserInfo.id);
  console.log(res)
  list.value = res.data.records
  total.value = res.data.total
}
onMounted(() => {
  getLoginUserDaily()
})
</script>

<template>
<!--  进入个人主页的前提是用户以及登录, 所以session中会有用户的信息 -->
  <div class="flex items-center w-3/4 justify-between">
    <div class="w-2/3">
      <div>
       <span class="text-2xl total-text-color font-semibold">
         欢迎回来&nbsp;<span class="underline">{{loginUserInfo.username}}</span>&nbsp;!
       </span>
      </div>

      <div class="pt-5">
        <hr class=" pb-2 border-gray-200 shadow-gray-100">
        <UserDaily :list="list" :total="total" :userId="loginUserInfo.id"></UserDaily>
      </div>
    </div>
    <div class="w-1/3 pl-6 self-start pt-2 flex-col ">
      <UserBox :user="loginUserInfo"></UserBox>
    </div>

  </div>
</template>

<style scoped>

</style>