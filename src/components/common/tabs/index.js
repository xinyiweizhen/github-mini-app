import Taro from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'

const Tabs = (props)=>{

  const { tabList, current, showAction, tabChange } = props


  return(
    <View>
      <View className='tabs'>
        {
            showAction ? 
            <View className='action-view'>
              <AtIcon value='filter' size='22' color='#333' />
            </View> 
            : 
            <View className='action-view' />
        }
        <View className='tabs-item'>
          {
            tabList && tabList.map((item, index)=>(
              <View key={index} onClick={()=>tabChange(index)}>
                <View className={['item', current === index ? 'item-select' : 'item-unselect']}>
                  <Text>{item}</Text>
                  <View className={['item-line', current === index ? 'item-underline-select' : 'item-underline-unselect']} />
                </View>
              </View>
            ))
          }
        </View>
      </View>
    </View>
  )
}

Tabs.propTypes = {
  tabList: PropTypes.array,
  showAction: PropTypes.bool,
  current: PropTypes.number,
  tabChange: PropTypes.func
}
Tabs.defaultProps = {
  tabList: [],
  showAction: false,
  current: 0
}

export default Tabs
