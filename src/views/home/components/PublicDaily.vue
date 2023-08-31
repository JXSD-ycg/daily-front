<script setup>

import {ref, onMounted} from "vue";
import {getPublicDailyAPI} from "../../../apis/home.js";
import DailyCard from "../../../components/DailyCard.vue";

//存放日记内容
const list = ref([

]);
const total = ref(0);


// 获取所有的公开日记
const getPublicDaily = async (current = 1) => {
  const res = await getPublicDailyAPI(current,7)
  list.value = res.data.records
  total.value = res.data.total
  console.log(res.data)
}
// 当 当前页改变时
const handleCurrentChange = (current) => {
  console.log(current)
  getPublicDaily(current, 10)
}
onMounted(() => getPublicDaily())

</script>

<template>
  <div class="flex-col items-center py-3" v-for="daily in list" :key="daily.id">
    <DailyCard  :daily="daily" :isPerson="false"></DailyCard>
  </div>

  <div class="flex items-center justify-center pb-2">
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
    />

  </div>

</template>

<style scoped>

</style>