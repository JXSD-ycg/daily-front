import http from "../uitls/http.js";

// 根据userid查询user  这里是一般用户 日记是公开的
export const getUserAPI = (id = 7) => {
  return http({
    url: `/user/${id}`
  })
}
