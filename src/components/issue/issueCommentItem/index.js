import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import PropTypes from 'prop-types'
import './index.less'
import { timeago } from '../../../utils/timeago'

const IssueCommentItem =  (props)=> {

  const { item } = props

  return (
    <View className='page'>
      <View className='info-view'>
          <View className='avatar'>
            <AtAvatar circle image={item.user.avatar_url} />
          </View>
          <View className='text-view'>
            <Text className='username'>{item.user.login}</Text>
            <Text className='time'>{`commented ${timeago(Date.parse(new Date(item.created_at)))}`}</Text>
          </View>
        </View>
        <View className='markdown'>
          <View className='md'>
            {/* TODO 解析 */}
            {/* <Markdown md={item.body} /> */}
          </View>
        </View>  
    </View>
  )
}

IssueCommentItem.propTypes = {
  item: PropTypes.object
}
IssueCommentItem.defaultProps = {
  item: {
    user: {
      avatar_url: '',
      login: ''
    },
    created_at: ''
  }
}

export default IssueCommentItem
