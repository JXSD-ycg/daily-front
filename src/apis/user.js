import http from "../uitls/http.js";

// 根据userid查询user
export const getUserAPI = (id = 7) => {
  return http({
    url: `/user/${id}`
  })
}