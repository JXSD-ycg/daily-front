<script setup>

import {useRoute} from "vue-router";
import {ref,onMounted} from 'vue'
import {getUserPublicDailyAPI} from "../../apis/person.js";
import {getUserAPI} from "../../apis/user.js";

import UserBox from "./components/UserBox.vue";
import UserPublicDaily from "./components/UserPublicDaily.vue";

const route = useRoute();
// 根据用户id查询 改用户下面的所有 public文章
const list = ref([]);
const total = ref(0);

// 查询日记
const getUserPublicDaily = async () => {
  const res = await getUserPublicDailyAPI(1, 7, route.params.id);
  console.log(res)
  list.value = res.data.records
  total.value = res.data.total
}

const user = ref({});
const getUserInfo = async () => {
  const res = await getUserAPI(route.params.id);
  user.value = res.data
}

onMounted(() => {
  getUserPublicDaily()
   getUserInfo()
})

</script>

<template>
  <div class="flex items-center w-3/4 justify-between">
    <div class="w-2/3">
      <div>
       <span class="text-2xl total-text-color font-semibold">
         这里是&nbsp;<span class="underline">{{user.username}}</span>&nbsp;的主页
       </span>
      </div>

      <div class="pt-5">
        <hr class=" pb-2 border-gray-200 shadow-gray-100">
       <UserPublicDaily :list="list" :total="total"></UserPublicDaily>
      </div>
    </div>
    <div class="w-1/3 pl-6 self-start pt-2 flex-col ">
      <UserBox :user="user"></UserBox>
    </div>

  </div>
</template>

<style scoped>

</style>