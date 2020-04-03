import Taro, { useState, updateShareMenu } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import SearchBar from '../../components/search/searchbar'
import SearchHistory from '../../components/search/searchhistory'
import './index.less'


const Index =  ()=> {

  const [searchHistory, setSearchHistory] = useState([])


  /**
   * 加载搜索历史列表数据
   */
  const loadSearchHistory = ()=>{
    Taro.getStorageSync({
        key: 'search_history',
        success: (res)=>{
            setSearchHistory([...res.data])
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
    array.splice(array.findIndex(item => item === value), 1)
    array.unshift(value)
    Taro.setStorageSync({
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
        updateSearchHistory(String(value).trim())
        // TODO 跳转搜索结果页
    }else{
        Taro.showToast({
            title: 'Please input content',
            icon: 'none'
          })
    }
  }

  const onTagClick = ()=>{
      
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
            <View className='clear' >Clear All</View>
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