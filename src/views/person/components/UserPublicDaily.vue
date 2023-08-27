<script setup>


import {defineProps, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getUserPublicDailyAPI} from "../../../apis/person.js";
import DailyCard from "../../../components/DailyCard.vue";

defineProps({
  list: {
    type: Array,
    default: () => {
    }
  },
  total: {
    type: Number
  }
})

// 当 当前页改变时
const handleCurrentChange = async (current) => {
  const res = await getUserPublicDailyAPI(current, 7, route.params.id);

  list.value = res.data.records
  total.value = res.data.total
}

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