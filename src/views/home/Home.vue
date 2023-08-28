<script setup>

import PublicDaily from "./components/PublicDaily.vue";
import Total from "./components/Total.vue";
import Hot from "./components/Hot.vue";
import Time from "./components/Time.vue";
</script>

<template>
<div class="flex items-center w-3/4 justify-between">
  <div class="w-2/3">
    <div>
     <Total></Total>
    </div>

    <div class="pt-5">
      <hr class=" pb-2 border-gray-200 shadow-gray-100">
      <PublicDaily></PublicDaily>
    </div>
  </div>
  <div class="w-1/3 pl-6 self-start pt-10 flex-col ">
      <Time class="mb-5" ></Time>
    最新
      <Hot></Hot>

  </div>

</div>
</template>

<style scoped>

</style>