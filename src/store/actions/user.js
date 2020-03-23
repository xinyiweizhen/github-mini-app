import { bindActionCreators } from 'redux'
import request from '../../api/request'
import { SET_USERINFO} from '../../constant/user'
import { createAsyncAction } from './index'
import store from '../index'

// 获取用户信息的异步action
const getUserInfo = createAsyncAction(SET_USERINFO, (params) => request.get('/user', params))

export default bindActionCreators({
    getUserInfo,
}, store.dispatch)