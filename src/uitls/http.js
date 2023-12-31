import axios from "axios";
import {ElMessage} from "element-plus";
import {useUserStore} from "../stores/userStore.js";

const http = axios.create({
  // cofig 中配置基础url
  baseURL : 'http://localhost:8080',
  // 配置超时时间
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8', // 设置请求头的编码为 UTF-8
  },
})

// axios请求拦截器
http.interceptors.request.use( config => {

  // 每次请求携带token
  const token = useUserStore().token
  if (token) {
    config.headers.Authorization = token;

  }
  return config;
}, e => Promise.reject(e))

// axios响应拦截器
http.interceptors.response.use( res => res.data, e => {
  ElMessage({
    type:'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})

export default http;