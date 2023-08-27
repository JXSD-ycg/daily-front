import http from "../uitls/http.js";

// 获取验证码字节数组, 用于用户登录
export const getCodeByteAPI = () => {
  return http({
    url: '/common/generateCode',
  })
}

// 登录请求
export const loginAPI = (data = {}) => {
  return http({
    url:'/user/login',
    method:'post',
    data
  })
}