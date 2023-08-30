import http from "../uitls/http.js";

// 上传文件
/**
 * @param formData
 * @param type  上传类型  0: 日记图片上传  1: 头像上传
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const uploadImageAPI = (formData, type = 0) => {
  return http.postForm(
    `/common/upload/${type}`, formData,)
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