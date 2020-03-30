import Taro, { useState, useRouter, useEffect, usePullDownRefresh, useReachBottom, useDidShow } from '@tarojs/taro'
import { View, Text, Navigator, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import request from '../../api/request'
import ListView from '../../components/account/listView'
import { REFRESH_STATUS, PRE_PAGE } from '../../constant/global'
import { HTTP_STATUS } from '../../constant/status'
import './index.less'


const Index =  ()=> {

    const router = useRouter()
    const { url } = router.params

    const [repo, setRepo] = useState({})

    const [hasStared, setHasStared] = useState(false)


    useDidShow(()=>{
      getRepoDetails()
    })

    // 下拉刷新
    usePullDownRefresh(()=>{
     
    })
    // 上拉加载更多
    useReachBottom( ()=>{
        
    })

    const getRepoDetails = ()=>{
      Taro.showLoading({title: 'Loading...'})
      request.get(decodeURI(url)).then(res=>{
        if (res.statusCode === HTTP_STATUS.SUCCESS){
          setRepo(res.data)
        }else{
          Taro.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }).finally(()=>{
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
      })
    }

    const items = [
      [
        {
          title: 'Author',
          icon: true,
          value: (repo.owner && repo.owner.login) || '--',
          onClick: ()=>{Taro.navigateTo({url: `/pages/developerInfo/index?username=${(repo.owner && repo.owner.login)}`})}
        },
        {
          title: 'View Code',
          icon: true,  
        },
        {
          title: 'Branch',
          value: (repo && repo.default_branch) || '--',
        },
        {
          title: 'Issues',
          icon: true,
          tag: (repo && repo.open_issues_count) || 0
        },
        {
          title: 'License',
          value: (repo.license && repo.license.name) || '--',
        },
        {
          title: 'Language',
          value: (repo && repo.language) || '--',
        },
      ],
      [
        {
          title: 'Contributors',
          icon: true
        },
        {
          title: 'Events',
          icon: true
        }
      ]
    ]

  return (
    <View className='page'>
      <View className='repo-bg-view'>
          <Text className='repo-info-title'>{repo.name}</Text>
          {
            repo.fork &&
            <View className='fork'>
              <AtIcon prefixClass='ion' value='ios-git-network' size='15' color='#fff' />
              <Navigator url={'/pages/repos/index?url=' + encodeURI(repo.parent.url)}>
                <Text className='fork-title'>
                  {repo.parent.full_name}
                </Text>
              </Navigator>
            </View>
          }
          <Text className='repo-info-desc'>{repo.description || 'no description'}</Text>
      </View>
      <View className='repo-number-view'>
          <View className='repo-number-item-view'>
            <View className='repo-number-item'>
              <AtIcon prefixClass='ion' value='ios-eye' size='25' color='#333' />
              <Text className='repo-number-title'>{repo.subscribers_count}</Text>
            </View>
            <View className='repo-number-item' >
              <AtIcon 
                prefixClass='ion'
                value={hasStared ? 'ios-star' : 'ios-star-outline'}
                size='25'
                color={hasStared ? '#333' : '#333'} 
              />
              <Text className='repo-number-title'>{repo.stargazers_count}</Text>
            </View>
            <View className='repo-number-item' >
              <AtIcon prefixClass='ion' value='ios-git-network' size='25' color='#333' />
              <Text className='repo-number-title'>{repo.forks_count}</Text>
            </View>
          </View>
          <View className='share-item-view'>
            <View className='repo-share-item'>
              <Button 
                className='action-button'
                openType='share'
              >
                <AtIcon prefixClass='ion' value='ios-share-alt' size='25' color='#333' />
                <Text className='action-button-title'>share</Text>
              </Button>
            </View>
            <View className='repo-share-item'>
              <Button className='action-button'>
                <AtIcon prefixClass='ion' value='md-images' size='22' color='#333' />
                <Text className='action-button-title'>save</Text>
              </Button>
            </View>
            <View className='repo-share-item'>
              <Button className='action-button'>
                <AtIcon prefixClass='ion' value='ios-link' size='23' color='#333' />
                <Text className='action-button-title'>copy</Text>
              </Button>
            </View>
          </View>
        </View>
        <ListView list={items} />
    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true,
}

export default Index
