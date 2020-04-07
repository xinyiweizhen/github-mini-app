import Taro, { useState, useEffect, useRouter } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { REFRESH_STATUS, PRE_PAGE } from '../../constant/global'
import Tabs from '../../components/common/tabs'
import request from '../../api/request'

import './index.less'


const Index =  ()=> {

    const router = useRouter()
    const { keyword } = router.params

    const [current, setCurrent] = useState(0)

    const [reposList, setReposList] = useState([])
    const [developersList, setDevelopersList] = useState([])

    const [reposSort, setReposSort] = useState('Best Match')
    const [developersSort, setDevelopersSort] = useState('Best Match')

    const searchRepos = ()=>{
        Taro.showLoading({title: 'Loading...'})
        request.get(`/search/repositories`, { per_page: PRE_PAGE, q: keyword, sort: reposSort, page: 1}).then( res=>{
            console.log(res);
        })
    }

    const searchDevelopers = ()=>{

    }

  return (
    <View className='page'>
      <Tabs 
        tabList={['REPO', 'USER']}
        current={current}
        tabChange={(index)=>setCurrent(index)}
      />
      {keyword}
    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white'
}

export default Index