import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import PropTypes from 'prop-types'
import { timeago } from '../../../utils/timeago'
import './index.less'

const IssuesItem =  (props)=> {

  const { item } = props

  const desc = `opend ${timeago(Date.parse(new Date(item.created_at)))} by ${item.user.login}`

  return (
    <View className='item'>
      <AtIcon 
        prefixClass='ion'
        size='20'
        color='#ff4949'
        value={item.state === 'open' ? 'ios-information-circle-outline' : 'ios-checkmark-circle-outline'}
      />
      <View className='issue-details'>
        <Text className='issue-title'>
          {`#${item.number} ${item.title}`}
        </Text>
        {
            item.comments > 0 &&
            <Text className='issue-desc'>
              {item.comments + ' comments'}
            </Text>
        }
        <Text className='issue-desc'>
          {desc}
        </Text>
          {
            item.repository && (
              <View>
                <AtIcon prefixClass='ion' value='md-bookmarks' size='15' color='#7f7f7f' />
                <Text className='issue-repo' >
                      {item.repository.full_name}
                    </Text>
              </View>
            )
          }
      </View>
    </View>
  )
}

IssuesItem.propTypes = {
  item: PropTypes.object,
}
IssuesItem.defaultProps = {
  item: {
    number: 0,
    created_at: '',
    state: '',
    title: '',
    user: {
      login: ''
    },
    comments: '',
    repository: {
      full_name: ''
    }
  }
}

export default IssuesItem
