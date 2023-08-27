

import http from "../uitls/http.js";

// 上传文件
export const uploadImageAPI = (formData) => {
  return http.postForm(
    '/common/upload',formData,)
}

export const addDailyAPI = (data) => {
  return http.post(
    '/daily/add',
    data
  )
}