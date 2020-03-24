import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
// eslint-disable-next-line import/first
import PropTypes from 'prop-types'
import './index.less'

const NORMAL = 0
const REFRESHING = 1
const NO_MORE_DATA = 2

const LoadMore =  (props)=> {

  const { status } = props

  let view = null
  useEffect(()=>{
    if(status === NORMAL){
      view = <View className='normal' />
    }else if(status === REFRESHING){
      view = (<View className='loading'>
        <AtActivityIndicator size={15} color='#2d8cf0' content='loading...' />
      </View>)
    }else if(status === NO_MORE_DATA){
      view =  <View className='no-more-data'>-- No More Data --</View>
    }
  }, [status])

  return (
    <View className='content'>
      {view}
    </View>
  )
}

LoadMore.propTypes = {
  status: PropTypes.number
}
LoadMore.defaultProps = {
  status: 0
}

export default LoadMore
