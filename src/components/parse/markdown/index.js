import Taro, {useState, useDidShow,useEffect} from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View } from '@tarojs/components'
import towxml from '../towxml'
import Towxml from '../towxml/towxml'
import './index.less'

const MarkDown = (props)=>{

  const [md, setMd] = useState('')

  const { content } = props


  useEffect(()=>{
    // console.log(content)
    parseMarkDown()
  }, [content])

  const parseMarkDown = ()=>{
    console.log(content)
    if(content){
      const text = towxml(content, 'markdown')
      setMd(text)
    }
  }

  return(
    <View className='content'>
      <Towxml nodes={md} />
    </View>
  )
}

MarkDown.propTypes = {
  content: PropTypes.string
}
MarkDown.defaultProps = {
  content: ''
}

export default MarkDown
