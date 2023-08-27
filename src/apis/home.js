import http from '../uitls/http.js'

// 获取所有公开的日记
export const getPublicDailyAPI = (current = 1, size = 7) => {
    return http({
      url: `/daily/public/${current}/${size}`,
      })
}

