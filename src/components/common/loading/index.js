import Taro from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Image, Text } from '@tarojs/components'
import './index.less'

const Loading = (props)=>{

  const { color, size } = props

  const sizeStyle = {
    width: `${size}px`,
    height: `${size}px`
  }

  const colorStyle = {
    'border': `1px solid ${color}`,
    'border-color': `${color} transparent transparent transparent`
  }

  const ringStyle = Object.assign({}, colorStyle, sizeStyle)

  return(
    <View className='at-loading' style={sizeStyle}>
        <View className='at-loading__ring' style={ringStyle}></View>
        <View className='at-loading__ring' style={ringStyle}></View>
        <View className='at-loading__ring' style={ringStyle}></View>
      </View>
  )
}

Loading.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    color: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
}
Loading.defaultProps = {
    size: '18',
    color: '#fff'
}

export default Loading
