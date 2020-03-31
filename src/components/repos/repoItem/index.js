import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtAvatar } from 'taro-ui'
import { timeago } from '../../../utils/timeago'
// eslint-disable-next-line import/first
import PropTypes from 'prop-types'
import { renderLanguageColor } from '../../../utils/renderLanguageInfo'
import './index.less'

const RepoItem =  (props)=> {

  const { item } = props

  const update_time =' ' + timeago(Date.parse(new Date(item.updated_at)))

  return (
    <View className='content'>
        <View className='repo-owner'>
          <View className='owner-info'>
            <AtAvatar 
              circle
              className='avatar'
              size='small'
              image={item.owner ? item.owner.avatar_url : require('../../../assets/images/octocat.png')} 
            />
            <Text className='owner-info-name'>{item.owner && item.owner.login}</Text>
          </View>
          {
            item.language &&
            <View className='repo-language'>
              <AtIcon prefixClass='ion' value='ios-radio-button-on' size='16' color={renderLanguageColor(item.language)} />
              <View className='repo-language-text'>{item.language}</View>
            </View>
          }
        </View>
        <View className='repo-title-view'>
          <View className='repo-title-text'>{item.full_name}</View>
        </View>
        <View className='repo-desc'>{item.description || 'no description'}</View>
        <View className='repo-bottom'>
          <View className='repo-number-item'>
            <AtIcon prefixClass='ion' value='ios-star' size='16' color='#7f7f7f' />
            <View className='repo-number-title'>{item.stargazers_count || 0}</View>
          </View>
          <View className='repo-number-item'>
            <AtIcon prefixClass='ion' value='ios-git-network' size='16' color='#7f7f7f' />
            <View className='repo-number-title'>{item.forks_count || 0}</View>
          </View>
          <View className='repo-number-item'>
            <AtIcon prefixClass='ion' value='ios-eye' size='16' color='#7f7f7f' />
            <View className='repo-number-title'>{item.watchers_count || 0}</View>
          </View>
        </View>
        <View className='update-view'>
          <AtIcon prefixClass='ion' value='ios-trending-up' size='14' color='#ff4949' />
          <View className='update-date'>updated{update_time}</View>
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
