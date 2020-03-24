import Taro, { useState, useRouter, useEffect, usePullDownRefresh, useReachBottom, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RepoItem  from '../../components/repos/repoItem'
import LoadMore from "../../components/common/loadMore";
import request from '../../api/request'
import './index.less'

const PER_PAGE = 10
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


    const { url } = router.params

    useEffect(()=>{
        Taro.showLoading({title: 'Loading...'})
        request.get( decodeURI(url), params).then((res)=>{
          if(params.page === 1){
            setReposList(res.data)
          }else {
            setReposList([...reposList, ...res.data])
          }
          setStatus( res.data.length < PER_PAGE ?  NO_MORE_DATA : NORMAL )
        })
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
      }, [params])
    // 下拉刷新
    usePullDownRefresh(()=>{
      setStatus(REFRESHING)
      setParams((preParams)=> ({...preParams, page : 1}))
    })
    // 上拉加载更多
    useReachBottom( ()=>{
        if(status !== NO_MORE_DATA){
            setParams((preParams)=> ({...preParams, page : preParams.page + 1}))
        }
    })

  return (
    <View className='page'>
      {
          reposList && reposList.map((item, index)=>(
            <RepoItem item={item} key={index} />
          ))
      }
      <LoadMore  status={status} />
    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true,
}

export default Index
