import http from "../uitls/http.js";

// 修改用户信息
export const updateUserInfo = (data) => {
  return http({
    url: '/user/updateUser',
    method: 'put',
    data
  })
}

// 用户退出登录
export const logout = () => {
  return http({
    url: '/user/logout',
    method: 'post',
  })
}
