import http from "../uitls/http.js";

/**
 * 修改用户密码接口
 * @param data
 * @returns {*}
 */
export const updatePassAPI = (data) => {
  return http({
    url: '/user/update',
    method: 'put',
    data
  })
}