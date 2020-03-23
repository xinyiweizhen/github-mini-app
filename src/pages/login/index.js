import Taro, { useState } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { base64_encode } from '../../utils/base64'
import userAtions from '../../store/actions/user'
import './index.less'
import { HTTP_STATUS } from '../../constant/status'

const Login = ()=> {
  const [tabKey, setTabKey] = useState(0)

  const [params, _setParams] = useState({
      token: '',
      username: '',
      password: ''
  })

  const setParams = (key, entry)=>{
    _setParams({
        ...params,
        [key]: entry
    })
  }

  const handleSubmit = ()=>{
    if(tabKey === 0){
        !params.token ? 
        Taro.showToast({
            title: 'Please input Token',
            icon: 'none'
        }) : Taro.setStorageSync('Authorization', `token ${params.token}`)
    }else{
        if(!params.username || !params.password){
            Taro.showToast({
                title: `Please input ${ !params.username ? 'Username':'Password'}`,
                icon: 'none'
            })
        }else{
            const authorization = 'Basic ' + base64_encode(params.username + ':' + params.password)
            Taro.setStorageSync('Authorization', authorization)
        }
    }
    Taro.showLoading({title: 'Login.....'})
    userAtions.getUserInfo().then(res=>{
      Taro.hideLoading()
      if(res.statusCode === HTTP_STATUS.SUCCESS){
        Taro.navigateBack()
      }else{
        Taro.showToast({
          title: res.data.message,
          icon: 'none'
        })
        Taro.setStorageSync('Authorization', '')
      }
    }).catch(()=>{

    })
  }

  return (
    <View className='page'>
      <View className='login-bg'>
        <Image className='logo' 
          mode='aspectFill' 
          src={require('../../assets/images/octocat.png')}
        />
        <Text className='login-bg-text'>Sign in to GitHub</Text>
      </View>
      <View className='login-content'>
        <View className='switch-view'>
          <View className={tabKey === 0 ? 'selected-title' : 'normal-title'}
            onClick={()=> setTabKey(0)} 
          >
            Token
          </View>
          <View className={tabKey === 1 ? 'selected-title' : 'normal-title'}
            onClick={()=> setTabKey(1)}
          >
            Account
          </View>
        </View>
        {tabKey === 0 ?
            <View className='input-view'>
            <AtInput
              className='input-bar'
              name='token'
              title='Token:'
              type='text'
              value={params.token}
              onChange={(v)=> setParams('token', v)}
              placeholder='please input token'
            />
            </View>
            : (
            <View className='input_view'>
            <AtInput
              className='input-bar'
              name='username'
              title='Username:'
              type='text'
              value={params.username}
              onChange={(v)=>setParams('username', v)}
              placeholder='please input username'
            />
            <AtInput
              className='input-bar'
              name='password'
              title='Password:'
              type='password'
              value={params.password}
              onChange={(v)=>setParams('password', v)}
              placeholder='please input password'
            />
            </View>
            )}
            <AtButton className='login-button' onClick={handleSubmit}>
                Sign in
            </AtButton>
    </View>
  </View>
  )
}

Login.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white'
}

export default Login