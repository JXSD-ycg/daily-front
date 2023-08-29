import http from "../uitls/http.js";

// 根据userId查询 用户的日记 公开的 + 私有的
export const getLoginUserDailyAPI = (current,size,id) => {
  return http({
    url :`/daily/personal/${current}/${size}/${id}`
  })

}