import Taro, { useState, useEffect, useRouter, usePullDownRefresh, useReachBottom, usePageScroll } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { REFRESH_STATUS, PRE_PAGE } from '../../constant/global'
import Tabs from '../../components/common/tabs'
import RepoItem  from '../../components/repos/repoItem'
import request from '../../api/request'
import FollowItem from '../../components/account/followItem'
import './index.less'


const Index =  ()=> {

    const router = useRouter()
    const { keyword } = router.params

    const [current, setCurrent] = useState(0)

    const [reposList, setReposList] = useState([])
    const [developersList, setDevelopersList] = useState([])

    const [status, setStatus] = useState(REFRESH_STATUS.NORMAL)

    const [sortValue, setSortValue] = useState('Best Match')

    const reposSorts = [
      {
        name: 'Best Match',
        sort: '',
        order: '',
      },
      {
        name: 'Most stars',
        sort: 'stars',
        order: 'desc',
      },
      {
        name: 'Fewest stars',
        sort: 'stars',
        order: 'asc',
      },
      {
        name: 'Most forks',
        sort: 'forks',
        order: 'desc',
      },
      {
        name: 'Recently updated',
        sort: 'updated',
        order: 'desc',
      },
      {
        name: 'Least recently updated',
        sort: 'updated',
        order: 'asc',
      }
      
    ]

    const developersStorts = [
      {
        name: 'Best Match',
        sort: '',
        order: '',
      },
      {
        name: 'Most followers',
        sort: 'followers',
        order: 'desc',
      },
      {
        name: 'Fewest followers',
        sort: 'followers',
        order: 'asc',
      },
      {
        name: 'Most recently joined',
        sort: 'joined',
        order: 'desc',
      },
      {
        name: 'Least recently joined',
        sort: 'joined',
        order: 'desc',
      },
      {
        name: 'Most repositories',
        sort: 'repositories',
        order: 'desc',
      },
      {
        name: 'Fewest repositories',
        sort: 'repositories',
        order: 'asc',
      }    
    ]

    const issuesStorts = [
      {
        name: 'Best Match',
        sort: '',
        order: '',
      },
      {
        name: 'Most commented',
        sort: 'followers',
        order: 'desc',
      },
      {
        name: 'Least commented',
        sort: 'followers',
        order: 'asc',
      },
      {
        name: 'Newest',
        sort: 'joined',
        order: 'desc',
      },
      {
        name: 'Oldest',
        sort: 'joined',
        order: 'desc',
      },
      {
        name: 'Recently updated',
        sort: 'repositories',
        order: 'desc',
      },
      {
        name: 'Least recently updated',
        sort: 'repositories',
        order: 'asc',
      }
    ]

    const [reposParams, setReposParams] = useState({
      per_page: PRE_PAGE, 
      q: keyword, 
      sort: 'Best Match', 
      order: 'desc',
      page: 1
    })

    const [developersParams, setDevelopersParams] = useState({
      per_page: PRE_PAGE, 
      q: keyword, 
      order: 'desc',
      sort: 'Best Match', 
      page: 1
    })

    useEffect(()=>{
        Taro.setNavigationBarTitle({
          title: keyword
        })
        switch(current){
          case 0: 
            searchRepos()
            break
          case 1:
            searchDevelopers()
            break
          case 2:
            searchIssues()
            break
        }
        console.log(reposParams);
    }, [reposParams, developersParams])


    // 下拉刷新
    usePullDownRefresh(()=>{
      setStatus(REFRESH_STATUS.REFRESHING)
      switch(current){
        case 0: 
          setReposParams((prev)=>({...prev, page: 1}))
          break
        case 1:
          setDevelopersParams((prev)=>({...prev, page: 1}))
          break
        case 2:
          searchIssues()
          break
      }
    })
    // 上拉加载更多
    useReachBottom( ()=>{
      if(status !== REFRESH_STATUS.NO_MORE_DATA){
        switch(current){
          case 0: 
            setReposParams((prev)=>({...prev, page: prev.page + 1}))
            break
          case 1:
            setDevelopersParams((prev)=>({...prev, page: prev.page + 1}))
            break
          case 2:
            searchIssues()
            break
        }
      }
    })

    usePageScroll(res=>{
      console.log(res.scrollTop)
    })

    const searchRepos = ()=>{
        Taro.showLoading({title: 'Loading...'})
        request.get(`/search/repositories`, reposParams).then( res=>{
            // console.log(res);
            if(reposParams.page === 1){
              setReposList(res.data.items)
            }else {
              setReposList([...reposList, ...res.data.items])
            }
            setStatus( res.data.items.length < PRE_PAGE ?  REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL )
        }).finally(()=>{
          Taro.stopPullDownRefresh()
          Taro.hideLoading()
        })
    }

    const searchDevelopers = ()=>{
      Taro.showLoading({title: 'Loading...'})
      request.get(`/search/users`, developersParams).then( res=>{
          console.log(res);
          if(developersParams.page === 1){
            setDevelopersList(res.data.items)
          }else {
            setDevelopersList([...developersList, ...res.data.items])
          }
          setStatus( res.data.items.length < PRE_PAGE ?  REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL )
      }).finally(()=>{
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
      })
    }

    const searchIssues = ()=>{

    }

    const onPickerChange = (e)=>{
      try{
        switch(current){
          case 0:
            setReposParams((prev)=>({
              ...prev,
              sort: reposSorts[e.detail.value].sort || '',
              order: reposSorts[e.detail.value].order || '',
              page: 1
            }))
            setSortValue(reposSorts[e.detail.value].name)
            break
          case 1: 
            const { sort, order, name } = 
            setDevelopersParams((prev)=>({
              ...prev,
              sort: developersStorts[e.detail.value].sort || '',
              order: developersStorts[e.detail.value].order || '',
              page: 1
            }))
            setSortValue(developersStorts[e.detail.value].name)
            break
          case 2:
            const { sort, order, name } = issuesStorts[e.detail.value]
            setSortValue(name)
            break
        }
      }catch(ex){
        console.log(ex);
      }
    }

  return (
    <View className='page'>
      <Tabs 
        tabList={['REPO', 'USER', 'ISSUES']}
        current={current}
        tabChange={(index)=>setCurrent(index)}
      />
      <View>
        {
          current === 0 ?
          (
            reposList && reposList.map((item, index)=>(
              <RepoItem item={item} key={index} />
            ))
          )
          : 
          current === 1 ?
          (
            developersList && developersList.map((item, index)=>(
              <FollowItem item={item} key={index} />
            ))
          )
          :
          'issues'
        }
      </View>
      {/* {
        (reposList.length > 0 || developersList.length > 0) && */}
        <Picker 
          mode='selector' 
          range={current === 0 ? reposSorts : current === 1 ? developersStorts : issuesStorts}
          range-key='name'
          onChange={onPickerChange}
        >
          <View className='filter' >
            <Text className='filter-title'>{sortValue}</Text>
          </View>
        </Picker>
{/*         
      } */}
      
    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true,
}

export default Index