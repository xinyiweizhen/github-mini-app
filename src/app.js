import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index/index'
import './assets/ionicons/css/ionicons.min.css'
// eslint-disable-next-line import/first
import 'taro-ui/dist/style/index.scss' 
import './app.less'
import configStore from './store'


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/account/index',
      'pages/login/index',
      'pages/repos/index'
    ],
    tabBar: {
      list: [
        {
          text: 'Trending',
          pagePath: 'pages/index/index',
          iconPath: './assets/images/tab-trending.png',
          selectedIconPath: './assets/images/tab-trending-s.png'
        },
        {
          text: 'Me',
          pagePath: 'pages/account/index',
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
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
