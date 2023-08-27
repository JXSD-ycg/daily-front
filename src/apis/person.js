
// 查询 用户下面 所有的 公开文章
import http from "../uitls/http.js";

export const getUserPublicDailyAPI = (current = 1, size = 7, id = 7) => {
  return http({
    url: `/daily/public/${current}/${size}/${id}`
  })
}