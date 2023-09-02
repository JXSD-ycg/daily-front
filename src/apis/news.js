

import http from "../uitls/http.js";
// 获取财经新闻

export const getFinanceAPI = () => {
  return http({
    url: '/common/finance'
  })
}
