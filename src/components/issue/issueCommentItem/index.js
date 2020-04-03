import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import PropTypes from 'prop-types'
import './index.less'
import { timeago } from '../../../utils/timeago'
import MarkDown from '../../parse/markdown'


const IssueCommentItem =  (props)=> {

  const { item } = props

  return (
    <View className='page'>
      <View className='user-info-view'>
          <View className='user-info'>
            <AtAvatar className='avatar-size' image={item.user.avatar_url} />
            <View className='text-view'>
              <Text className='username'>{item.user.login}</Text>
              <Text className='time'>{`commented ${timeago(Date.parse(new Date(item.created_at)))}`}</Text>
            </View>
          </View>
        </View>
        <View className='markdown'>
          <MarkDown content={item.body} />
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
