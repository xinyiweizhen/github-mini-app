import Taro, { useState, useEffect, usePullDownRefresh, useReachBottom, useRouter } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import '../account/index.less'
import FollowItem from "../../components/account/followItem";
import LoadMore from "../../components/common/loadMore";
import Empty from "../../components/common/empty";
import request from "../../api/request";
import { REFRESH_STATUS, PRE_PAGE } from '../../constant/global'


const Index = ()=>{

  const [followList, setFollowList] = useState([])

  const router = useRouter()

  const [params, setParams] = useState({
    page: 1,
    per_page: PRE_PAGE,
  })

  const [status, setStatus] = useState(REFRESH_STATUS.NORMAL)

  const { type, username } = router.params

  useEffect(()=>{
    let url = ''
    if(type === 'followers'){
      url = username ? `/users/${username}/followers` : `/user/followers`
      Taro.setNavigationBarTitle({
        title : 'Followers'
      })
    }else if(type === 'following'){
      url = username ? `/users/${username}/following` : `/user/following`
      Taro.setNavigationBarTitle({
        title : 'Following'
      })
    }
    Taro.showLoading({title: 'Loading...'})
    request.get( decodeURI(url), params).then((res)=>{
      if(params.page === 1){
        setFollowList(res.data)
      }else {
        setFollowList([...followList, ...res.data])
      }
      setStatus( res.data.length < PRE_PAGE ?  REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL )
    }).catch(e=>{
      console.log(e);
      Taro.showToast({
        title: 'Login failed please try again',
        icon: 'none',
      })
    }).finally(()=>{
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    })

  }, [params])

  // 下拉刷新
  usePullDownRefresh(()=>{
    setStatus(REFRESH_STATUS.REFRESHING)
    setParams((preParams)=> ({...preParams, page : 1}))
  })
  // 上拉加载更多
  useReachBottom( ()=>{
      if(status !== REFRESH_STATUS.NO_MORE_DATA){
          setParams((preParams)=> ({...preParams, page : preParams.page + 1}))
      }
  })

  return(
    <View className='page'>
      {
        followList.length > 0 ? followList.map((item, index)=>(
          <FollowItem  item={item} key={index} />
        )): <Empty />
      }
      <LoadMore />
    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true,
}

export default Index
