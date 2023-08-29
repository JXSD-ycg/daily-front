import http from "../uitls/http.js";

// 上传文件
export const uploadImageAPI = (formData) => {
  return http.postForm(
    '/common/upload', formData,)
}

// 新增或修改日记
export const addDailyAPI = (data) => {
  return http({
    url: '/daily/add',
    method: 'post',
    data: data
  })
}

// 查询日记,
export const getOneDailyAPI = (id) => {
  return http({
      url: `/daily/query/${id}`,
    }
  )
}

// 用户修改日记
export const updateDailyInfoAPI = (data) => {
  return http({
      url: `/daily/personal`,
      method: 'put',
      data,
    }
  )
}