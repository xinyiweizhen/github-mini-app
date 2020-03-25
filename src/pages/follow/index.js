import Taro, { useState, useEffect, usePullDownRefresh, useDidShow } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtAvatar } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import userAtions from '../../store/actions/user'
import ListView from '../../components/account/listView'
import { hasLogin } from '../../utils/hasLogin'
import './index.less'


const Index = ()=>{


  return(
    <View className='page'>

    </View>
  )
}
export default Index
