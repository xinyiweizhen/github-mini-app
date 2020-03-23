import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constant/status'


const baseUrl = 'https://api.github.com'
/**
 * 
 * 
 */
export default {
    baseOptions(params, method = 'GET') {
        const { url, data } = params
        const contentType = params.contentType || 'application/json'

        const option = {
            url: url.startsWith('http') ? url : baseUrl + url,
            data,
            method,
            header: {
                'content-type': contentType,
                'Authorization' : Taro.getStorageSync('Authorization')
            },
            success(res){
                if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
                    return new Error('api', '请求资源不存在')
                  } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
                    return new Error('api', '服务端出现了问题')
                  } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
                    Taro.setStorageSync('Authorization', '')
                      Taro.navigateTo({
                        url: '/pages/login/login'
                      })
                    return new Error('api', '没有权限访问')
                  } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
                    Taro.setStorageSync('Authorization', '')
                    Taro.navigateTo({
                        url: '/pages/login/index'
                      })
                    return new Error('api', '需要鉴权')
                  } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
                    return res.data
                  }
            },
            fail(e) {
                console.error('api', '请求接口出现问题', e)
            }
        }
        return Taro.request(option)
    },
    get(url, data = '') {
        const params = { url, data }
        return this.baseOptions(params)
      },
      post: function (url, data, contentType) {
        const params = { url, data, contentType }
        return this.baseOptions(params, 'POST')
      },
      put(url, data = '') {
        const params = { url, data }
        return this.baseOptions(params, 'PUT')
      },
      delete(url, data = '') {
        const params = { url, data }
        return this.baseOptions(params, 'DELETE')
      }
}