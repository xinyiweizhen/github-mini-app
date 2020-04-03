import Taro, { useState, useRouter, useEffect, usePullDownRefresh, useReachBottom, usePageScroll } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import LoadMore from '../../components/common/loadMore'
import IssuesList from '../../components/issue/issuesList'
import request from '../../api/request'
import { REFRESH_STATUS, PRE_PAGE } from '../../constant/global'
import './index.less'
import Tabs from '../../components/common/tabs'


const Index =  ()=> {

  const [current, setCurrent] = useState(0)

  const [openIssuesList, setOpenIssuesList] = useState([])
  const [closedIssuesList, setClosedIssuesList] = useState([])

  const [status, setStatus] = useState(REFRESH_STATUS.NORMAL)

  const router = useRouter()
  const { url } = router.params

  const [openPage, setOpenPage] = useState(1)
  const [closePage, setClosePage] = useState(1)

  useEffect(()=>{
    getOpenIssues()
    }, [openPage])

  useEffect(()=>{
    getClosedIssues()
  }, [closePage])


  usePageScroll(res=>{
    console.log(res.scrollTop)
  })

  // 下拉刷新
  usePullDownRefresh(()=>{
    setStatus(REFRESH_STATUS.REFRESHING)
    if(current === 0){
      openPage === 1 && getOpenIssues()
      setOpenPage(1)
    }else{
      closePage === 1 && getClosedIssues()
      setClosePage(1)
    }
  })
  // 上拉加载更多
  useReachBottom( ()=>{
      if(status !== REFRESH_STATUS.NO_MORE_DATA){
        if(current === 0){
          setOpenPage(prePage => prePage + 1 )
        }else{
          setClosePage(prePage => prePage + 1 )
        }
      }
  })


  const getOpenIssues = ()=>{
    Taro.showLoading({title: 'Loading...'})
    request.get(decodeURI(url), {openPage, state: 'open', per_page: PRE_PAGE, filter: 'all'}).then((res)=>{
      if(openPage === 1){
        setOpenIssuesList(res.data)
      }else {
        setOpenIssuesList([...openIssuesList, ...res.data])
      }
      setStatus( res.data.length < PRE_PAGE ?  REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL )
    }).finally(()=>{
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    })
  }

  const getClosedIssues = ()=>{
    Taro.showLoading({title: 'Loading...'})
    request.get(decodeURI(url), {closePage, state: 'closed', per_page: PRE_PAGE, filter: 'all'}).then((res)=>{
      if(closePage === 1){
        setClosedIssuesList(res.data)
      }else {
        setClosedIssuesList([...closedIssuesList, ...res.data])
      }
      setStatus( res.data.length < PRE_PAGE ?  REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL )
    }).finally(()=>{
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    })
  }


  return (
    <View className='page'>
      <Tabs 
        tabList={['OPEN', 'CLOSED']}
        current={current}
        tabChange={(index)=>setCurrent(index)}
      />
      {
        current === 0 ? 
        <IssuesList list={openIssuesList} />
        : 
        <IssuesList list={closedIssuesList} />
      }
      <LoadMore status={status} />
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true,
}

export default Index
