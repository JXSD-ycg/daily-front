<script setup>
import {defineProps, onMounted, ref} from "vue";
import {getPublicDailyAPI} from "../apis/home.js";
import {getUserAPI} from "../apis/user.js";

// todo 日记模型还为确定
defineProps({
  daily: {
    type: Object,
    // 对象的默认值
    default: () => {
    }
  },
  // 是否是个人日记
  isPerson :{
    type: Boolean,
  }
});


</script>

<template>
  <div class="px-2 py-5 flex items-center justify-between">
    <div class="flex flex-col items-center space-y-4">
      <div class="flex items-center self-start">
        <svg class="w6 h-6 pr-3" viewBox="0 0 1024 1024">
          <path
              d="M511.913993 941.605241c-255.612968 0-385.311608-57.452713-385.311608-170.810012 0-80.846632 133.654964-133.998992 266.621871-151.88846L393.224257 602.049387c-79.986561-55.904586-118.86175-153.436587-118.86175-297.240383 0-139.33143 87.211154-222.586259 233.423148-222.586259l7.912649 0c146.211994 0 233.423148 83.254829 233.423148 222.586259 0 54.184445 0 214.67361-117.829666 297.412397l-0.344028 16.685369c132.966907 18.061482 266.105829 71.041828 266.105829 151.716445C897.225601 884.152528 767.526961 941.605241 511.913993 941.605241zM507.957668 141.567613c-79.470519 0-174.250294 28.382328-174.250294 163.241391 0 129.698639 34.230808 213.469511 104.584579 255.784982 8.944734 5.332437 14.277171 14.965228 14.277171 25.286074l0 59.344868c0 15.309256-11.524945 28.0383-26.662187 29.414413-144.319839 14.449185-239.959684 67.429531-239.959684 95.983874 0 92.199563 177.346548 111.637158 325.966739 111.637158 148.792206 0 325.966739-19.26558 325.966739-111.637158 0-28.726356-95.639845-81.534688-239.959684-95.983874-15.48127-1.548127-27.006215-14.621199-26.662187-30.102469l1.376113-59.344868c0.172014-10.148833 5.676466-19.437594 14.277171-24.770032 70.525785-42.487485 103.208466-123.678145 103.208466-255.784982 0-135.031077-94.779775-163.241391-174.250294-163.241391L507.957668 141.567613 507.957668 141.567613z"
              fill="#575B66"></path>
        </svg>

        <!--          点击用户名即可查看用户的所有的公开日记 -->
        <router-link v-if="!isPerson" class="font-bold pr-3 text-blue-400 hover:text-blue-300"
                     :to="`/person/${daily.userId}`">
          {{ daily.username }}
        </router-link>
        <router-link v-else class="font-bold pr-3 text-blue-400 hover:text-blue-300"
                     to="#">
          {{ daily.username }}
        </router-link>

        <span class="text-gray-500">
           [{{ daily.bookTitle === 'default' ? '默认' : daily.bookTitle }} 日记]
        [天气: 晴]
        [心情: 喜]
        [地点: 广州]
        </span>

      </div>
      <div class="h-auto pl-1 pr-5 self-start w-full ">
        {{ daily.content }}
      </div>
      <div class="flex self-start">
        <span class="text-gray-500">
           <span class="px-1"> {{ new Date(daily.createTime).toLocaleString() }}</span>
        <span class="px-1">  {{ daily.likes }}点赞</span>
        <span class="px-1"> {{ daily.views }}观看</span>
        </span>


      </div>
    </div>
    <img class=" my-3 w-24 h-24" :src="daily.image">
  </div>
</template>

<style scoped>

</style>