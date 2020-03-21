import Taro from '@tarojs/taro'
// eslint-disable-next-line import/prefer-default-export
export const hasLogin = ()=>{
    return Taro.getStorageSync('Authorization').length > 0
}