
// 获取每日一句api
import http from "../uitls/http.js";

export const getSentenceAPI = () => {
  return http({
    url:'/common/sentence'
  })
}

export const getTotalInfoAPI = () => {
  return http({
      url: '/common/total'
  })
}