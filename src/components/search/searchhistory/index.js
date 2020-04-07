import Taro from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import './index.less'

const SearchHistory = (props)=>{

  const { onTagClick, items } = props

  return(
    <View className='page'>
      <View className='tag-view'>
        {
            items && items.map((value)=>(
                <View key={value} className='tag-item'>
                    <AtTag size='small'  circle active onClick={onTagClick} name={value}>{value}</AtTag>
                </View>
            ))
        }
        </View>
    </View>
  )
}

SearchHistory.propTypes = {
    items: PropTypes.array,
    onTagClick: PropTypes.func
}
SearchHistory.defaultProps = {
    items: [],
    onTagClick: ()=>{}
}

export default SearchHistory
