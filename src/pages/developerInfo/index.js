import Taro, { useState, useEffect, usePullDownRefresh, useRouter } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import ListView from '../../components/account/listView'
import request from "../../api/request";
import { hasLogin } from '../../utils/hasLogin'
import './index.less'

const Index =  ()=> {

  const [developerInfo, setDeveloperInfo] = useState({})

  const router = useRouter()
  
  const { username } = router.params

  const [isFollowed, setIsFollowed] = useState(false)

    useEffect(()=>{
        getDeveloperInfo()
    }, [])

    // 下拉刷新
    usePullDownRefresh(()=>{
      getDeveloperInfo()
    })

    // 获取用户信息
    const getDeveloperInfo = ()=>{
      Taro.showLoading({title: 'Loading...'})
      request.get( decodeURI(`/users/${username}`)).then((res)=>{
        setDeveloperInfo(res.data)
      }).then(()=>{
        CheckUserFollowingDeveloper()
      }).finally(()=>{
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
      })
    }

    const CheckUserFollowingDeveloper = ()=>{
      if(hasLogin()){
        request.get(`/user/following/${username}`).then(res=>{
          setIsFollowed(res.statusCode === 204)
        }).finally(()=>{
          Taro.stopPullDownRefresh()
          Taro.hideLoading()
        })
      }
    }

    const handleFollow = ()=>{
      if(hasLogin()){
        Taro.showLoading({title: 'Loading...'})
        if(isFollowed){
          request.delete(`/user/following/${username}`).then(res=>{
            if(res.statusCode === 204){
              setIsFollowed(false)
            }
          }).finally(()=>{
            Taro.hideLoading()
          })
        }else{
          request.put(`/user/following/${username}`).then(res =>{
            if(res.statusCode === 204){
              setIsFollowed(true)
            }
          }).finally(()=>{
            Taro.hideLoading()
          })
        }
      }
    }

    const items = [
      [
        {
          title: 'Starred Repos',
          icon: true,
          onClick: ()=>{Taro.navigateTo({url: `/pages/reposlist/index?url=/users/${encodeURI(developerInfo.login)}/starred`})}
        }
      ],
      [
        {
          title: 'Email',
          value: developerInfo ? developerInfo.email : '--',
        },
        {
          title: 'Blog',
          value: developerInfo ? developerInfo.blog : '--',
        },
        {
          title: 'Company',
          value: developerInfo ? developerInfo.company : '--',
        },
        {
          title: 'Localtion',
          value: developerInfo ? developerInfo.location : '--',
        }
      ]
    ]


  return (
    <View>
        <View  className='page'>
          <View  className='account-bg'  >
            <View className='user-info'>
              <AtAvatar className='avatar' size='large' text={developerInfo.login} circle image={developerInfo.avatar_url} />
              <Text className='username'>{developerInfo.name || developerInfo.login}</Text>
              <View className='login-name'>@{developerInfo.login}</View> 
            </View>
          </View>
          <View className='info-view'>
            {developerInfo.bio && <View className='bio'>{developerInfo.bio}</View>}
            <View className='item-view'>
              <View className='item' onClick={()=> Taro.navigateTo({url: `/pages/reposlist/index?url=${encodeURI(developerInfo.repos_url)}`})}>
                <View className='title'>{Number(developerInfo.public_repos) || 0}</View>
                <View className='desc'>Repos</View>
              </View>
              <View className='line' />
              <View className='item' onClick={()=> Taro.navigateTo({url: `/pages/follow/index?type=followers&username=${developerInfo.login}`})}>
                <View className='title'>{developerInfo.followers || 0}</View>
                <View className='desc'>Followers</View>
              </View>
              <View className='line' />
              <View className='item' onClick={()=> Taro.navigateTo({url: `/pages/follow/index?type=following&username=${developerInfo.login}`})}>
                <View className='title'>{developerInfo.following || 0}</View>
                <View className='desc'>Following</View>
              </View>
            </View>
          </View>
          <View className='button-view'>
            {
              developerInfo.type === 'User' &&
              <Button className='button' onClick={handleFollow}>
                {isFollowed ? 'Unfollow' : 'Follow'}
              </Button>
            }
            <Button className='button' openType='share'>Share</Button>
          </View>
          <ListView list={items} />
          <View className='page-bottom' />
        </View>
    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true
}

export default Index
