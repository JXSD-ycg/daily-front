<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutHeader from "./components/LayoutHeader.vue";

</script>

<template>
  <div class="flew flex-col max-h-fit" >
    <el-affix :offset="0">
      <div class="z-50  top-0 fixed w-full right-0 flex justify-center header-color shadow-gray-50 shadow-lg">
        <LayoutHeader></LayoutHeader>
      </div>
    </el-affix>

      <div class="z-40 mt-20 w-full flex items-center justify-center">
        <transition>
          <router-view></router-view>
        </transition>
      </div>

      <div class="w-full flex items-center justify-center pt-5 pb-10">
        <LayoutFooter></LayoutFooter>
      </div>

  </div>

  <el-backtop :right="150" :bottom="100">
    <div>
      UP
    </div>
  </el-backtop>
</template>

<style scoped>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>