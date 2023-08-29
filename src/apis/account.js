import * as http from "http";

// 修改用户信息
export const updateUserInfo = (data) => {
  return http({
    url: '',
    method: 'put'
  })
}
