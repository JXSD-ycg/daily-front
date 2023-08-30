<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";

</script>

<template>
  <div class="flew flex-col scroll-smooth ">

    <el-affix :offset="0">
      <div class="z-1 top-0 grow fixed w-full right-0 flex justify-center header-color shadow-gray-50 shadow-lg">
        <LayoutHeader></LayoutHeader>
      </div>
    </el-affix>
    <div class="mt-20 w-full flex items-center justify-center">
      <Router-view></Router-view>
    </div>
    <div class="w-full flex items-center justify-center">
      <LayoutFooter></LayoutFooter>
    </div>

  </div>


</template>

<style scoped>

</style>