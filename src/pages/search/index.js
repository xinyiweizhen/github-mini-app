import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import SearchBar from '../../components/search/searchbar'
import SearchHistory from '../../components/search/searchhistory'
import './index.less'


const Index =  ()=> {

  const [searchHistory, setSearchHistory] = useState([])


  useEffect(()=>{
    loadSearchHistory()
  }, [])

  /**
   * 加载搜索历史列表数据
   */
  const loadSearchHistory = ()=>{
    Taro.getStorage({
        key: 'search_history',
        success: (res)=>{
          if (res.data.length > 0) {
            setSearchHistory([...res.data])
          }
        },
        fail: ()=>{
          Taro.setStorage({
            key: 'search_history',
            value: ''
          })
        }
    })
  }

  /**
   * 更新搜索历史列表数据
   * 
   * @param {string} value keyword
   */
  const updateSearchHistory = (value)=>{
    let array = [...searchHistory]
    const index = array.findIndex(item => item === value)
    if(index >= 0 ){
      array.splice(index, 1)
    }
    array.unshift(value)
    Taro.setStorage({
        key: 'search_history',
        data: array,
        success: ()=>{
            loadSearchHistory()
        }
    })
  }

  /**
   * 清空搜索历史列表数据
   */
  const clearSearchHistory = ()=>{
    Taro.removeStorage({
        key: 'search_history',
        success: ()=>{
            setSearchHistory([])
        }
    })
  }


  const onClickSearch = (e)=>{
    const value = e.target.value
    if(value){
        updateSearchHistory(value)
        Taro.navigateTo({
          url: `/pages/searchResult/index?keyword=${encodeURI(value)}`
        })
    }else{
        Taro.showToast({
            title: 'Please input content',
            icon: 'none'
          })
    }
  }

  const onTagClick = ({name})=>{
      updateSearchHistory(name)
      Taro.navigateTo({
        url: `/pages/searchResult/index?keyword=${encodeURI(name)}`
      })
  }

  return (
    <View className='page'>
      <View className='search-bar-fixed'>
          <SearchBar onClickSearch={onClickSearch} />
      </View>
      {
          searchHistory.length > 0 &&
          <View className='search-history-bg'>
            <View className='search-history'>
              <SearchHistory items={searchHistory} onTagClick={onTagClick} />
            </View>
            <View className='clear' onClick={clearSearchHistory}>Clear All</View>
          </View>
        }
    </View>
  )
}

Index.config = {
  navigationBarTitleText: 'Search',
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white'
}

export default Index