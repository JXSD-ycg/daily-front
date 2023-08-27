
// 上传文件
import http from "../uitls/http.js";

export const uploadImageAPI = (formData) => {
  return http.postForm(
    '/common/upload',formData,)
}