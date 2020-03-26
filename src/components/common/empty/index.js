import Taro from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Image, Text } from '@tarojs/components'
import './index.less'

const Empty = (props)=>{

  const { content } = props
  return(
    <View className='content'>
      <Image className='img' src={require('../../../assets/images/octocat.png')} />
      <Text className='text'>{content}</Text>
    </View>
  )
}

Empty.propTypes = {
  content: PropTypes.string
}
Empty.defaultProps = {
  content: 'Oops! No Something here...'
}

export default Empty
