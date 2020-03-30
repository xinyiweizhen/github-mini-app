import Taro, { useState, useEffect, usePullDownRefresh, useDidShow } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import ListView from '../../components/account/listView'
import { hasLogin } from '../../utils/hasLogin'
import userAtions from '../../store/actions/user'
import './index.less'

const Index =  ()=> {

  const [isLogin, setIsLogin] = useState(true)

  // const userInfo = useSelector(state=> state.user.userInfo)

  const userInfo = {
    "login": "xinyiweizhen",
    "id": 32378188,
    "node_id": "MDQ6VXNlcjMyMzc4MTg4",
    "avatar_url": "https://avatars2.githubusercontent.com/u/32378188?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/xinyiweizhen",
    "html_url": "https://github.com/xinyiweizhen",
    "followers_url": "https://api.github.com/users/xinyiweizhen/followers",
    "following_url": "https://api.github.com/users/xinyiweizhen/following{/other_user}",
    "gists_url": "https://api.github.com/users/xinyiweizhen/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/xinyiweizhen/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/xinyiweizhen/subscriptions",
    "organizations_url": "https://api.github.com/users/xinyiweizhen/orgs",
    "repos_url": "https://api.github.com/users/xinyiweizhen/repos",
    "events_url": "https://api.github.com/users/xinyiweizhen/events{/privacy}",
    "received_events_url": "https://api.github.com/users/xinyiweizhen/received_events",
    "type": "User",
    "site_admin": false,
    "name": null,
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "public_repos": 5,
    "public_gists": 0,
    "followers": 0,
    "following": 0,
    "created_at": "2017-09-29T01:30:04Z",
    "updated_at": "2020-03-25T01:43:42Z",
    "private_gists": 0,
    "total_private_repos": 4,
    "owned_private_repos": 4,
    "disk_usage": 10195,
    "collaborators": 0,
    "two_factor_authentication": false,
    "plan": {
      "name": "free",
      "space": 976562499,
      "collaborators": 0,
      "private_repos": 10000
    }
  }
    const goToLogin = ()=>{
        Taro.navigateTo({
            url: '/pages/login/index'
        })
    }

    useDidShow(()=>{
      // getUserInfo()
    })

    // 下拉刷新
    usePullDownRefresh(()=>{
      // getUserInfo()
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
          icon: true,
          onClick: ()=>{Taro.navigateTo({url: '/pages/reposlist/index?url=' + encodeURI(`/user/starred`)})}
        },
        {
          title: 'Issues',
          icon: true,
          onClick: ()=>{Taro.navigateTo({url: '/pages/issuelist/index?url=' + encodeURI(`/user/issues`)})}
        }
      ],
      [
        {
          title: 'Email',
          value: userInfo ? userInfo.email : '--',
        },
        {
          title: 'Blog',
          value: userInfo ? userInfo.blog : '--',
        },
        {
          title: 'Company',
          value: userInfo ? userInfo.company : '--',
        },
        {
          title: 'Localtion',
          value: userInfo ? userInfo.location : '--',
        }
      ],
      [
        {
          title: 'About',
          icon: true,
        }
      ]
    ]


  return (
    <View>
      {
        isLogin && userInfo ?
        <View  className='page'>
          <View  className='account-bg'  >
            <View className='user-info'>
              <AtAvatar className='avatar' size='large' text={userInfo.login} circle image={userInfo.avatar_url} />
              {
                userInfo.name.length > 0 &&
                <Text className='username'>{userInfo.name}</Text>
              }
              <View className='login-name'>@{userInfo.login}</View>
            </View>
          </View>
          <View className='info-view'>
            {userInfo.bio && <View className='bio'>{userInfo.bio}</View>}
            <View className='item-view'>
              <View className='item' onClick={()=> Taro.navigateTo({url: `/pages/reposlist/index?url=https://api.github.com/users/fjc0k/repos`})}>
                <View className='title'>{userInfo && Number(userInfo.public_repos + userInfo.owned_private_repos)}</View>
                <View className='desc'>Repos</View>
              </View>
              <View className='line' />
              <View className='item' onClick={()=> Taro.navigateTo({url: `/pages/follow/index?type=followers`})}>
                <View className='title'>{userInfo && userInfo.followers}</View>
                <View className='desc'>Followers</View>
              </View>
              <View className='line' />
              <View className='item' onClick={()=> Taro.navigateTo({url: `/pages/follow/index?type=following&username=apersonw`})}>
                <View className='title'>{userInfo && userInfo.following}</View>
                <View className='desc'>Following</View>
              </View>
            </View>
          </View>
          <ListView list={items} />
          <View className='page-bottom' />
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
