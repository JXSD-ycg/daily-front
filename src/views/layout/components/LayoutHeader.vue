<script setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute();
console.log(route.fullPath)
console.log(route.name)


</script>

<template>
  <div class="flex h-14 w-3/4 text-white items-center justify-between header-color border-none">
    <div class="flex items-center">
      <div class="px-10  font-sans text-2xl">
        <router-link to="/">
          随手记
        </router-link>
      </div>
      <div class="px-6 flex space-x-10">
        <router-link :class="{active: route.name === 'home' || route.name === 'layout' }" class="hover:border-b-2" to="/">
          首页
        </router-link>

<!--        <router-link :class="{active: route.name === 'person'}" class="hover:border-b-2 " to="/person">-->
<!--          个人中心-->
<!--        </router-link>-->

        <router-link :class="{active: route.name === 'edit'}" class="hover:border-b-2 " to="/edit">
          开始记日记
        </router-link>

      </div>
    </div>

    <div class="flex items-center">

      <div class="px-8">
        <router-link :class="{active: route.name === 'login'}" class="hover:border-b-2" to="/login">
          登录
        </router-link>

      </div>
      <div class="px-8">
        <router-link :class="{active: route.name === '注册'}" class="hover:border-b-2" to="/register">
          注册
        </router-link>

      </div>
    </div>


  </div>

</template>

<style scoped>
.active {
  border-bottom-width: 2px;
}
</style>