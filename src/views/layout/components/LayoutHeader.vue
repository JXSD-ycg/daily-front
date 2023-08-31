<script setup>
import {ElMessage} from "element-plus";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from 'vue-router'
import {logout} from "../../../apis/account.js";
import router from "../../../router/index.js";
import {useUserStore} from "../../../stores/userStore.js";

const route = useRoute();

const userStore = useUserStore();
// 退出功能
const confirmEvent = async () => {
  //退出功能
  const res = await logout();
  if (res.code === 1) {
    ElMessage.info("成功退出")
    // 清理token和用户信息
    useUserStore().logout()
    await router.push("/")
  }
}




</script>

<template>
  <div class="flex h-14 w-3/4 text-white items-center justify-between header-color ">
    <div class="flex items-center">
      <div class="px-10 font-sans text-2xl">
        <router-link to="/">
          随手记
        </router-link>
      </div>
      <div class="px-6 flex items-center space-x-10">
        <router-link :class="{active: route.name === 'home' || route.name === 'layout' }" class="hover:border-b-2"
                     to="/">
          首页
        </router-link>

        <router-link :class="{active: route.name === 'edit'}" class="hover:border-b-2  " to="/edit">
          开始日记
        </router-link>

        <div v-if="userStore.token" >
          <router-link :class="{active: route.name === 'userHome'}" class="hover:border-b-2 "
                       to="/userHome">
            个人主页
          </router-link>

        </div>

      </div>
    </div>

    <div>
      <div v-if="!userStore.token" class="flex items-center space-x-5">
        <div class="">
          <router-link :class="{active: route.name === 'login'}" class="hover:border-b-2" to="/login">
            登录
          </router-link>
        </div>

        <div class="px-1">
          <router-link :class="{active: route.name === '注册'}" class="hover:border-b-2 " to="/register">
            注册
          </router-link>
        </div>
      </div>

      <div v-else class="flex items-center space-x-5">
        <div class="">
        <router-link :class="{active: route.name === 'account'}" class="hover:border-b-2" to="/account">
          账号设置
        </router-link>
      </div>

      <div class="px-1">
        <el-popconfirm
            hide-after="50"
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="#626AEF"
            title="确定退出登录吗?"
            @confirm="confirmEvent"
        >
          <template #reference>
            <a href="#" class="hover:border-b-2 ">
              退出登录
            </a>
          </template>
        </el-popconfirm>
      </div>
    </div>


  </div>

  </div>

</template>

<style scoped>
.active {
  border-bottom-width: 2px;
}
</style>