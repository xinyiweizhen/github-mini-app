import 'taro-ui/dist/style/index.scss' 
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index/index'
import './app.less'


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/login/index',
    ],
    tabBar: {
      list: [
        {
          text: 'Trending',
          pagePath: 'pages/login/index',
          iconPath: './assets/images/tab-trending.png',
          selectedIconPath: './assets/images/tab-trending-s.png'
        },
        {
          text: 'Me',
          pagePath: 'pages/login/index',
          iconPath: './assets/images/tab-github.png',
          selectedIconPath: './assets/images/tab-github-s.png'
        }
      ],
      color: '#afafaf',
      selectedColor: '#ffffff',
      backgroundColor: '#24292e',
      borderStyle: 'white'
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'GitHub Mini',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
