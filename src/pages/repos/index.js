import Taro, { useState, useRouter, useEffect, usePullDownRefresh, useReachBottom, useDidShow } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import RepoItem  from '../../components/repos/repoItem'
import request from '../../api/request'
import './index.less'

const PER_PAGE = 2
const NORMAL = 0
const REFRESHING = 1
const NO_MORE_DATA = 2

const Index =  ()=> {
    const [reposList, setReposList] = useState([])

    const [params, setParams] = useState({
      page: 1,
      per_page: PER_PAGE,
      type: 'owner',
      sort: 'updated'
    })

    const [status, setStatus] = useState(NORMAL)

    const router = useRouter()
  
      useDidShow(()=>{
        getReposList()
      })

    // 下拉刷新
    usePullDownRefresh(()=>{
      getReposList()
    })
    // 上拉加载更多
    useReachBottom(()=>{
        if(status !== NO_MORE_DATA){
            setParams({
                    ...params,
                    page: params.page + 1
                })
            getReposList()
        }
       console.log(params);
    })

    const getReposList = ()=>{
        Taro.showLoading({title: 'Loading...'})
        const { url } = router.params
        request.get( decodeURI(url), params).then((res)=>{
            setReposList([...reposList, ...res.data])
            setStatus(res.data.length < PER_PAGE ? NO_MORE_DATA : NORMAL)
        })
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
    }
 
  return (
    <View className='page'>
      {
          reposList && reposList.map((item, index)=>(
            <RepoItem item={item} key={index} />
          ))
      }
      {
          reposList && reposList.map((item, index)=>(
            <RepoItem item={item} key={index} />
          ))
      }
      {
          reposList && reposList.map((item, index)=>(
            <RepoItem item={item} key={index} />
          ))
      }
    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true,
  onReachBottomDistance: 50,
}

export default Index