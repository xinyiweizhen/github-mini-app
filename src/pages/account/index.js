import Taro, { useState, useEffect, usePullDownRefresh, useDidShow } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtAvatar, AtIcon } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import userAtions from '../../store/actions/user'
import ListView from '../../components/userInfo/listView'
import { hasLogin } from '../../utils/hasLogin'
import './index.less'

const Index =  ()=> {

  const [isLogin, setIsLogin] = useState(false)

  const userInfo = useSelector(state=> state.user.userInfo)

    const goToLogin = ()=>{
        Taro.navigateTo({
            url: '/pages/login/index'
        })
    }

    useEffect(()=>{
      getUserInfo()
    }, [])

    useDidShow(()=>{
      getUserInfo()
    })

    // 下拉刷新
    usePullDownRefresh(()=>{
      getUserInfo()
    })

    // 获取用户信息
    const getUserInfo = ()=>{
      Taro.showLoading({title: 'Loading...'})
      if(hasLogin()){
        userAtions.getUserInfo().then(res =>{
          if(!res){ // 请求失败返回underfine
            Taro.hideLoading()
            Taro.showToast({
              title: 'Login failed please try again',
              icon: 'none',
            })
            Taro.stopPullDownRefresh()
            setIsLogin(false)
          }else{
            Taro.hideLoading()
            Taro.stopPullDownRefresh()
            setIsLogin(true)
          }
        })
      }else{
        Taro.hideLoading()
        Taro.stopPullDownRefresh()
        setIsLogin(false)
      }
    }

    const items = [
      [
        {
          title: 'Starred Repos',
          displayIcon: true
        },
        {
          title: 'Issues',
          displayIcon: true
        }
      ],
      [
        {
          title: 'Email',
          value: userInfo ? userInfo.email : '--',
          displayIcon: false
        },
        {
          title: 'Blog',
          value: userInfo ? userInfo.blog : '--',
          displayIcon: false
        },
        {
          title: 'Company',
          value: userInfo ? userInfo.company : '--',
          displayIcon: false
        },
        {
          title: 'Localtion',
          value: userInfo ? userInfo.location : '--',
          displayIcon: false
        }
      ],
      [
        {
          title: 'About',
          displayIcon: true
        }
      ]
    ]  
    

  return (
    <View>
      {
        isLogin && userInfo ? 
        <View  className='page'>
          <Image  className='account-bg' src={require('../../assets/images/account_bg.png')} />
          <View className='user-info'>
            <AtAvatar className='avatar' size='large' text={userInfo.login} circle image={userInfo.avatar_url} />
            {
              userInfo.name.length > 0 &&
              <Text className='username'>{userInfo.name}</Text>
            }
            <View className='login-name'>@{userInfo.login}</View>
          </View>
          <View className='info-view'> 
            {userInfo.bio && <View className='bio'>{userInfo.bio}</View>}
            <View className='item-view'>
              <View className='item' >
                <View className='title'>{userInfo && Number(userInfo.public_repos + userInfo.owned_private_repos)}</View>
                <View className='desc'>Repos</View>
              </View>
              <View className='line' />
              <View className='item' >
                <View className='title'>{userInfo && userInfo.followers}</View>
                <View className='desc'>Followers</View>
              </View>
              <View className='line' />
              <View className='item' >
                <View className='title'>{userInfo && userInfo.following}</View>
                <View className='desc'>Following</View>
              </View>
            </View>
          </View>
          <ListView list={items} />
          <View className='page-bottom'/>
        </View>
        :
        <View  className='page'>
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

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true
}

export default Index