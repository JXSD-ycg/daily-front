<script setup>

import {ref, onMounted} from "vue";
import {getLoginUserDailyAPI} from "../../apis/userHome.js";
import {useUserStore} from "../../stores/userStore.js";

import UserBox from "./components/UserBox.vue";
import UserDaily from "./components/UserDaily.vue";


// 从storage中获取登录用户信息
const userStore = useUserStore();
const loginUserInfo = userStore.loginUserInfo

</script>

<template>
  <!--  进入个人主页的前提是用户以及登录, 所以session中会有用户的信息 -->
  <div class="flex items-center w-3/4 justify-between">
    <div class="w-2/3">
      <div>
       <span class="text-2xl total-text-color font-semibold">
         欢迎回来&nbsp;<span class="underline">{{ loginUserInfo.username }}</span>&nbsp;!
       </span>
      </div>

      <div class="pt-5">
        <hr class=" pb-2 border-gray-200 shadow-gray-100">
        <UserDaily ></UserDaily>
      </div>

    </div>
    <div class="w-1/3 pl-6 self-start pt-2 flex-col ">
      <UserBox :user="loginUserInfo"></UserBox>
    </div>

  </div>
</template>

<style scoped>

</style>