
// 发送并获取邮箱验证码
import http from "../uitls/http.js";

export const sentCodeAPI = (email = '') => {
  return http({
    url: `/common/sentMail/${email}`
  })
}

export const registerAPI = (data) => {
  return http({
    url :'/user/register',
    data
  })
}


