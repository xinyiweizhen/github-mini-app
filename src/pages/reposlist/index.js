import Taro, { useState, useRouter, useEffect, usePullDownRefresh, useReachBottom, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RepoItem  from '../../components/repos/repoItem'
import LoadMore from '../../components/common/loadMore'
import request from '../../api/request'
import { REFRESH_STATUS, PRE_PAGE } from '../../constant/global'
import './index.less'


const Index =  ()=> {
    const [reposList, setReposList] = useState([])

    const [params, setParams] = useState({
      page: 1,
      per_page: PRE_PAGE,
      type: 'owner',
      sort: 'updated'
    })

    const [status, setStatus] = useState(REFRESH_STATUS.NORMAL)

    const router = useRouter()


    const { url } = router.params

    useEffect(()=>{
      getReposList()
      }, [params])


    /**
     * 请求仓库列表
     * 
     * @param {*} url 
     * @param {*} params 
     */
    const getReposList = ()=>{
      Taro.showLoading({title: 'Loading...'})
      request.get( decodeURI(url), params).then((res)=>{
        if(params.page === 1){
          setReposList(res.data)
        }else {
          setReposList([...reposList, ...res.data])
        }
        setStatus( res.data.length < PRE_PAGE ?  REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL )
      }).finally(()=>{
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
      })
    }


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

  return (
    <View className='page'>
      {
          reposList && reposList.map((item, index)=>(
            <View key={index} onClick={()=>Taro.navigateTo({url: `/pages/repos/index?url=${encodeURI(item.url)}`})}>
              <RepoItem item={item} />
            </View>
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
