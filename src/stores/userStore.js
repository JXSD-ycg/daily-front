import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {loginAPI} from "../apis/login.js";
import {getUserAPI} from "../apis/user.js";

export const useUserStore = defineStore('user', () => {

    // 存储登录token
    const token = ref('')
    // 存储登录token
    const loginUserInfo = ref('')

    // 用户登录 登录成功, 将token存入localstorage
    const login = async ({email, password, picCode, codeId}) => {
      const res = await loginAPI({email, password, picCode, codeId});
      if (res.code === 1) {
        // 用户登录. 存储 token 和用户 id
        token.value = res.data.token
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
      loginUserInfo.value = res.data
    }

    const logout = () => {
      token.value = ''
      loginUserInfo.value = null
    }

    function increment() {

    }

    return {
      login,
      storeLoginUserInfo,
      loginUserInfo,
      token,
      logout
    }
  },
  {
    persist: {
      key: "myKey",
      storage: localStorage,
      paths: ["token", "loginUserInfo"],
      serializer: {
        serialize: JSON.stringify,
        deserialize: JSON.parse
      }
    }
  }
)
