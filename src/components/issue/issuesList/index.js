import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import PropTypes from 'prop-types'
import './index.less'
import IssuesItem from '../iusuesItem'

const IssuesList =  (props)=> {

  const { list } = props

  return (
    <View className='page'>
      {
          list && list.map((item, index)=>(
            <View  key={index} onClick={()=>Taro.navigateTo({url: `/pages/issue/index?url=${encodeURI(item.url)}`})}>
                <IssuesItem item={item} />
            </View>
          ))
      }      
    </View>
  )
}

IssuesList.propTypes = {
  list: PropTypes.array
}
IssuesList.defaultProps = {
  list: []
}

export default IssuesList
