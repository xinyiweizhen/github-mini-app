import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

const Index =  ()=> {

  return (
    <View className='index'>
      <Text>213131</Text>
    </View>
  )
}

/**
 * 
 * 注意
 *    由于我们把 Index 从类组件改造成了函数组件，所以挂载 config 要在 Index 组件定义之后直接挂载在 Index 上面。
 * 
 */
Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white'
}

export default Index