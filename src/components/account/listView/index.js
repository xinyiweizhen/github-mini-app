import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { isFunction } from 'lodash'
import PropTypes from 'prop-types'
import './index.less'

const ListView =  (props)=> {

  const { list } = props

  return (
    <View>
      {
        list && list.map((array)=>(
          <View className='list-view' key={array}>
            { array && array.map((item)=>(
                <View className='list' key={item.title} onClick={isFunction(item.onClick) ? item.onClick : null}>
                    <View className='list-title'>{item.title}</View>
                    <View className='list-content'>
                      { item.tag && <View className='tag'>{item.tag}</View>}
                      { item.value && <View className='content'>{item.value}</View> }
                      { item.icon && <AtIcon prefixClass='ion' value='ios-arrow-forward' size='18' color='#7f7f7f' /> }
                    </View>
                </View>
              ))}
          </View>
        ))
      }
    </View>
  )
}

ListView.propTypes = {
  list: PropTypes.array,
}
ListView.defaultProps = {
  list: null,
}

export default ListView