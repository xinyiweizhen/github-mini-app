import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import ListView from '../../components/userInfo/listView'
// eslint-disable-next-line import/first
import { useSelector } from '@tarojs/redux'
import { hasLogin } from '../../utils/hasLogin'
import { getUserInfoActions } from '../../store/actions/user'
import './index.less'

const Index =  ()=> {



    const userInfo = useSelector(state => state.user.userInfo)

    const goToLogin = ()=>{
        Taro.navigateTo({
            url: '/pages/login/index'
        })
    }

    useEffect(()=>{
      Taro.showLoading({title: 'Loading...'})
      getUserInfo()
    }, [])


    const getUserInfo = ()=>{
      if(hasLogin()){
        getUserInfoActions().then(()=>{
          Taro.hideLoading()
          Taro.stopPullDownRefresh()
        })
      }else{
        Taro.hideLoading()
        Taro.stopPullDownRefresh()
      }
    }

    const items = [
      {
        title: 'Email',
        value: userInfo.email.length > 0 ? userInfo.email : '--',
        displayIcon: false
      },
      {
        title: 'Blog',
        value: userInfo.blog.length > 0 ? userInfo.blog : '--',
        displayIcon: false
      },
      {
        title: 'Company',
        value: userInfo.company.length > 0 ? userInfo.company : '--',
        displayIcon: false
      },
      {
        title: 'Localtion',
        value: userInfo.location.length > 0 ? userInfo.location : '--',
        displayIcon: false
      }
    ]

  return (
    <View className='page'>
      {
        hasLogin() ? 
        <View>
          <View className='user_info'>
                <AtAvatar className='avatar' circle image={userInfo.avatar_url}/>
                {
                  userInfo.name.length > 0 &&
                  <Text className='username'>{userInfo.name}</Text>
                }
                <View className='login_name'>@{userInfo.login}</View>
              </View>
          <ListView
            list={items}
          />
        </View>
        :
        <View>
          <Image mode='aspectFit'
            className='logo'
            src={require('../../assets/images/octocat.png')} 
          />
          <AtButton className='login-button'
            onClick={goToLogin}
          >
            Login
          </AtButton>
        </View>
      }
      
    </View>
  )
}

/**
 * 
 * 注意
 *    由于我们把 Index 从类组件改造成了函数组件，所以挂载 config 要在 Index 组件定义之后直接挂载在 Index 上面。
 * 
 */
Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true
}

export default Index