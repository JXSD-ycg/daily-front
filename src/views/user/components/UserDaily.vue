<script setup>

import {defineProps, onMounted, ref} from "vue";

import {getLoginUserDailyAPI} from "../../../apis/userHome.js";
import DailyCard from "../../../components/DailyCard.vue";
import {useUserStore} from "../../../stores/userStore.js";

// 从storage中获取登录用户信息
const userStore = useUserStore();
const loginUserInfo = userStore.loginUserInfo

// 根据用户id查询 改用户下面的所有 public文章
const list = ref([]);
const total = ref(0);
const userId = ref(loginUserInfo.id);

// 查询第一页的日记
const getLoginUserDaily = async () => {
  const res = await getLoginUserDailyAPI(1, 7,userId.value);
  console.log(res)
  list.value = res.data.records
  total.value = res.data.total
  console.log("list:", list.value)
  console.log("total:", total.value)
}
onMounted(() => {
  getLoginUserDaily()
})


// 当 当前页改变时
const handleCurrentChange = async (current) => {
  console.log("当前页: ", current)
  console.log("用户id", userId.value)
  const res = await getLoginUserDailyAPI(current, 7, userId.value);
  list.value = res.data.records

}

</script>

<template>

<!--  <el-timeline>-->
<!--&lt;!&ndash;    <div class="flex-col items-center py-3" v-for="daily in list" :key="daily.id">&ndash;&gt;-->
<!--      <el-timeline-item  class="flex-col items-center py-13" v-for="daily in list" :key="daily.id" :timestamp="new Date(daily.createTime).toLocaleString()" placement="top">-->
<!--        <DailyCard :daily="daily" :isPerson="true"></DailyCard>-->
<!--      </el-timeline-item>-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--  </el-timeline>-->

  <div class="flex-col items-center py-3" v-for="daily in list" :key="daily.id">
    <DailyCard :daily="daily" :isPerson="true"></DailyCard>
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