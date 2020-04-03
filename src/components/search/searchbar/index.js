import Taro from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Input } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'

const SearchBar = (props)=>{
    const { onClickSearch } = props

  return(
    <View className='page'>
      <View className='search-bar-bg'>
          <AtIcon className='icon' value='search' size='18' color='#666' />
          <Input 
            className='search-bar'
            type='text'
            placeholder='Search what you want...'
            confirmType='search'
            focus
            onConfirm={onClickSearch}
          />
      </View>
    </View>
  )
}

SearchBar.propTypes = {
    onClickSearch: PropTypes.func
}
SearchBar.defaultProps = {
    onClickSearch: ()=>{}
}

export default SearchBar
