
// 发送并获取邮箱验证码
import http from "../uitls/http.js";

/**
 * 发送邮箱验证码  0:注册邮箱 1:修改密码邮箱
 * @param email
 * @param type
 * @returns {*}
 */
export const sentCodeAPI = (email = '', type = 0) => {
  return http({
    url: `/common/sentMail/${email}/${type}`
  })
}

export const registerAPI = (data) => {
  return http({
    url :'/user/register',
    data
  })
}


