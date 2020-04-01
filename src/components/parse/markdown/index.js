import Taro, {useState, useDidShow, useEffect} from '@tarojs/taro'
import PropTypes from 'prop-types';
import { View, Text } from '@tarojs/components'
import Towxml from '../towxml'
import towxml from '../towxml/towxml'
import './index.less'
// eslint-disable-next-line import/first
import { AtIcon } from 'taro-ui';

const MarkDown = (props)=>{

  const [nodes, setNodes] = useState({})

  const { content, name, link } = props


  useEffect(()=>{
    // console.log(content)
    parseMarkDown()
  }, [content])

  const parseMarkDown = ()=>{
    if(content){
      const text = Towxml(content, 'markdown', {
        base: link
      })
      setNodes(text)
    }
  }

  return(
    <View className='page'>
      {
        content ? 
        <View>
          <View className='title'>
            <AtIcon prefixClass='ion' value='ios-book' size='25' color='#000' />
            <Text className='text'>{name}</Text>
          </View>
          <View className='content'>
            <towxml nodes={nodes} />
          </View>
        </View>
        :
        <Text className='empty'>No documents yet !</Text>
      }
      
    </View>
  )
}

MarkDown.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
MarkDown.defaultProps = {
  content: ''
}

export default MarkDown
