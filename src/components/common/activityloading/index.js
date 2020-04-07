import Taro from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Image, Text } from '@tarojs/components'
import './index.less'
import Loading from '../loading';

const ActivityLoading = (props)=>{

  const { color, size, text } = props


  const colorStyle = {
    'color': `${color}`,
    'font-size': '30rpx',
    'margin-left': '10rpx',
  }

  return(
    <View className='activity-loading' >
        <Loading color={color} size={size} />
        {text && <Text style={colorStyle}>{text}</Text>}
      </View>
  )
}

ActivityLoading.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    color: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    text: PropTypes.string
}
ActivityLoading.defaultProps = {
    size: '18',
    color: '#fff',
    text: ''
}

export default ActivityLoading
