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
            { array && array.map((item, index)=>(
                <View className='list' key={index} onClick={isFunction(item.onClick) ? item.onClick : null}>
                    <View className='list-title'>{item.title}</View>
                    <View className='list-content'>
                      { item.tag && <View className='tag'>{item.tag}</View>}
                      { item.value && !item.color && <View className='content'>{item.value}</View> }
                      { item.value && item.color &&  
                        <View className='content'>
                          <AtIcon prefixClass='ion' value='ios-radio-button-on' size='16' color={item.color ? item.color : '#7f7f7f'} />
                          <View className='repo-language-text'>{item.value}</View>
                        </View> }
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