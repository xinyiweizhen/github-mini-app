import Taro from '@tarojs/taro'
import request from '../../api/request'
import { SET_USERINFO} from '../../constant/user'
import { HTTP_STATUS } from '../../constant/status'
import { useDispatch  } from '@tarojs/redux'

const dispatch = useDispatch()
// eslint-disable-next-line import/prefer-default-export
export const getUserInfoActions = ()=>{
    return new Promise((resolve, reject)=>{
        request.get('/user').then((res)=>{
            console.log(res.data);
            if (res.statusCode !== HTTP_STATUS.SUCCESS) {
              Taro.showToast({
                title: res.data.message,
                icon: 'none'
              })
              Taro.setStorageSync('Authorization', '')
            } else {
              dispatch({
                type: SET_USERINFO,
                payload: {
                  data: res.data
                }
              })
              resolve()
            }
        }).catch(()=>{
            reject() 
        })
    })
}