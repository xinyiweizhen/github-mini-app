import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { timeago } from '../../../utils/timeago'
// eslint-disable-next-line import/first
import PropTypes from 'prop-types'
import './index.less'

const RepoItem =  (props)=> {

  const { item } = props

  const is_bottom_show = item && (item.language || item.stargazers_count > 0 || item.forks_count > 0)

  const update_time =' ' + timeago(Date.parse(new Date(item.updated_at)))

  return (
    <View className='content'>
        <View className='repo-title-view'>
          <AtIcon prefixClass='ion' value='md-bookmarks' size='25' color='#333' />
          <View className='repo-title'>{item.full_name}</View>
        </View>
        <View className='repo-desc'>{item.description || 'no description'}</View>
        {is_bottom_show &&
        <View className='repo-bottom'>
          {
            item.language &&
            <View className='repo-number-item'>
              <AtIcon prefixClass='ion' value='ios-radio-button-on' size='16' color='#7f7f7f' />
              <View className='repo-number-title'>{item.language}</View>
            </View>
          }
          {
            item.stargazers_count > 0 &&
            <View className='repo-number-item'>
              <AtIcon prefixClass='ion' value='ios-star' size='16' color='#7f7f7f' />
              <View className='repo-number-title'>{item.stargazers_count}</View>
            </View>
          }
          {
            item.forks_count > 0 &&
            <View className='repo-number-item'>
              <AtIcon prefixClass='ion' value='ios-git-network' size='16' color='#7f7f7f'/>
              <View className='repo-number-title'>{item.forks_count}</View>
            </View>
          }
        </View>
        }
        <View className='update-view'>
          <AtIcon prefixClass='ion' value='ios-trending-up' size='18' color='#ff4949' />
          <View className='update_date'>updated{update_time}</View>
        </View>
      </View>
  )
}

RepoItem.propTypes = {
  item: PropTypes.object
}
RepoItem.defaultProps = {
  item: {
    language: '',
    updated_at: '',
    full_name: '',
    stargazers_count: '',
    forks_count: '',
    description: ''
  }
}

export default RepoItem
