import Taro, { useState, useRouter, useEffect, usePullDownRefresh, useReachBottom, useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import IssueCommentItem from '../../components/issue/issueCommentItem'
import request from '../../api/request'
import { REFRESH_STATUS, PRE_PAGE } from '../../constant/global'
import './index.less'


const Index =  ()=> {


  const [issueInfo, setIssueInfo] = useState({})

  const [issueCommentList, setIssueCommentList] = useState([])

  const router = useRouter()
  const { url } = router.params

  const [params, setParams] = useState({
    page: 1,
    per_page: PRE_PAGE
  })

  useEffect(()=>{
    getIssueDetails()
  }, [])

  const getIssueDetails = ()=>{
    Taro.showLoading({title: 'Loading...'})
    request.get(decodeURI(url)).then((res)=>{
        setIssueInfo(res.data)
        getIssueComments()
    }).finally(()=>{
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    })
  }

  const getIssueComments = ()=>{
    Taro.showLoading({title: 'Loading...'})
    request.get(decodeURI(`${url}/comments`), params).then((res)=>{
      if(params.page === 1){
        setIssueCommentList(res.data)
      }else {
        setIssueCommentList([...issueCommentList, ...res.data])
      }
      
    }).finally(()=>{
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    })
  }

  return (
    <View className='page'>
        <View className='title-view'>
          <Text className='title'>{`#${issueInfo.number} ${issueInfo.title}`}</Text>
          {
            issueInfo.body ? (
              <View className='markdown'>
                <View className='md'>
                  
                </View>
              </View>
            ) : (
              <Text className='description'>
                no description
              </Text>
            )
          }
        </View>
        {
          issueCommentList.map((item, index) => {
            return (
              <IssueCommentItem item={item} key={index} />
            )
          })
        }
    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTitleText: 'Issue Comments',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true,
}

export default Index
