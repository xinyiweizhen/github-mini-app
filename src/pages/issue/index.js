import Taro, { useState, useRouter, useEffect, usePullDownRefresh, useReachBottom, useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import IssueCommentItem from '../../components/issue/issueCommentItem'
import request from '../../api/request'
import { REFRESH_STATUS, PRE_PAGE } from '../../constant/global'
import { timeago } from '../../utils/timeago'
import './index.less'
// eslint-disable-next-line import/first
import { AtAvatar } from 'taro-ui'
import MarkDown from '../../components/parse/markdown'


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
          <Text className='title'>{ issueInfo.title || 'none title'}</Text>
          <Text className='number'>{`#${issueInfo.number}` || '' }</Text>
        </View>
        <View className='owner-view'>
          <View className='owner-info'>
            <AtAvatar 
              className='avatar-size'
              size='small'
              image={issueInfo.user && issueInfo.user.avatar_url}
            />
            <View className='text'>
              <Text className='name'>{issueInfo.user.login || 'none'}</Text>
              <Text className='time'>{ issueInfo && timeago(Date.parse(new Date(issueInfo.created_at))) || 'none'}</Text>
            </View>
          </View>
          <View className='opration'></View>
        </View>
        <View className='description-view'>
        {
            issueInfo.body ? (
              <View className='markdown'>
                  <MarkDown content={issueInfo.body} />
              </View>
            ) : (
              <Text className='description'>
                no description
              </Text>
            )
          }
        </View>
        <View className='comments-view'>
        {
          issueCommentList.map((item, index) => {
            return (
              <IssueCommentItem item={item} key={index} />
            )
          })
        }
        </View>
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
