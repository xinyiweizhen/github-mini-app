import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import PropTypes from 'prop-types'
import './index.less'

const FollowItem =  (props)=> {

  const { item } = props

  return (
    <View className='item-view' onClick={()=> Taro.navigateTo({url: `/pages/developerInfo/index?username=${item.login}`})} >
      <AtAvatar circle image={item.avatar_url} />
      <View className='user-name'>{item.name || item.login}</View>
    </View>
  )
}

FollowItem.propTypes = {
  item: PropTypes.object
}
FollowItem.defaultProps = {
  item: {
    avatar_url: '',
    login: '',
    name: ''
  }
}

export default FollowItem
