import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {loginAPI} from "../apis/login.js";
import {getUserAPI} from "../apis/user.js";

export const useUserStore = defineStore('user', () => {

  // 存储登录token
  const token = ref('')

    // 用户登录 登录成功, 将token存入localstorage
    const login = async ({email, password, picCode, codeId}) => {
      const res = await loginAPI({email, password, picCode, codeId});
      if (res.code === 1) {
        // 用户登录. 存储 token 和用户 id
        token.value = res.data.token
        localStorage.setItem("Authorization", res.data.token)
        // 存储登录用户信息
        await storeLoginUserInfo(res.data.id);
        return true;
      }
      return false;
    }

    // 存储登录用户的信息
    const storeLoginUserInfo = async (id) => {
      const res = await getUserAPI(id);
      // 存入 sessionStorage
      token.value = JSON.stringify(res.data)
      localStorage.setItem("loginUserInfo", JSON.stringify(res.data))
    }

    // 获取登录用户信息
    const getLoginUserInfo = () => {
      return JSON.parse(localStorage.getItem("loginUserInfo"))
    }

  // 获取登录用户token
  const getUserToken = () => {
    return localStorage.getItem("Authorization")
  }



  const logout = () => {
    localStorage.removeItem("Authorization")
    localStorage.removeItem("loginUserInfo")
    token.value = ''
  }

    function increment() {

    }

    return {
      login,
      storeLoginUserInfo,
      getLoginUserInfo,
      token,
      getUserToken,
      logout
    }
  },
)
