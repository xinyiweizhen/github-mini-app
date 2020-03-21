import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'

const ListView =  (props)=> {

    const { list } = props

  return (
    <View className='list_view'>
    {
       list && list.map((item)=>(
        <View className='list' key={item.title}>
            <View className='list_title'>{item.title}</View>
            <View className='list_content'>{ item.value ? item.value : '--'}</View>
            { item.displayIcon &&  <AtIcon prefixClass='ion' value='ios-arrow-forward' size='18' color='#7f7f7f' />}
        </View>
       )) 
    }
  </View>
  )
}


export default ListView