<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";

</script>

<template>
  <div class="flew flex-col  ">
    <div class="top-0 fixed w-full flex justify-center header-color shadow-gray-50 shadow-lg">
      <LayoutHeader></LayoutHeader>
    </div>
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