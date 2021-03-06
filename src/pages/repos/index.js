import Taro, { useState, useRouter, useEffect, usePullDownRefresh, useReachBottom, useDidShow } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { AtIcon, AtActivityIndicator } from 'taro-ui'
import request from '../../api/request'
import ListView from '../../components/account/listView'
import Loading from '../../components/common/loading'
import { REFRESH_STATUS } from '../../constant/global'
import { HTTP_STATUS } from '../../constant/status'
import { renderLanguageColor } from '../../utils/renderLanguageInfo'
import { base64_decode } from '../../utils/base64'
import { hasLogin } from '../../utils/hasLogin'
import MarkDown from '../../components/parse/markdown'
import './index.less'
import ActivityLoading from '../../components/common/activityloading'


const Index =  ()=> {

    const router = useRouter()
    const { url } = router.params

    const [repo, setRepo] = useState({})

    const [repoStarCount, setRepoStarCount] = useState(0)
    const [repoWatchCount, setRepoWatchCount] = useState(0)

    // {
    //   "id": 176001214,
    //   "node_id": "MDEwOlJlcG9zaXRvcnkxNzYwMDEyMTQ=",
    //   "name": "taro-mall",
    //   "full_name": "apersonw/taro-mall",
    //   "private": false,
    //   "owner": {
    //     "login": "apersonw",
    //     "id": 21074939,
    //     "node_id": "MDQ6VXNlcjIxMDc0OTM5",
    //     "avatar_url": "https://avatars0.githubusercontent.com/u/21074939?v=4",
    //     "gravatar_id": "",
    //     "url": "https://api.github.com/users/apersonw",
    //     "html_url": "https://github.com/apersonw",
    //     "followers_url": "https://api.github.com/users/apersonw/followers",
    //     "following_url": "https://api.github.com/users/apersonw/following{/other_user}",
    //     "gists_url": "https://api.github.com/users/apersonw/gists{/gist_id}",
    //     "starred_url": "https://api.github.com/users/apersonw/starred{/owner}{/repo}",
    //     "subscriptions_url": "https://api.github.com/users/apersonw/subscriptions",
    //     "organizations_url": "https://api.github.com/users/apersonw/orgs",
    //     "repos_url": "https://api.github.com/users/apersonw/repos",
    //     "events_url": "https://api.github.com/users/apersonw/events{/privacy}",
    //     "received_events_url": "https://api.github.com/users/apersonw/received_events",
    //     "type": "User",
    //     "site_admin": false
    //   },
    //   "html_url": "https://github.com/apersonw/taro-mall",
    //   "description": "一个项目的架构，包括设计/前端/管理后台/后端/k8s集群架构，欢迎Star，欢迎Fork",
    //   "fork": false,
    //   "url": "https://api.github.com/repos/apersonw/taro-mall",
    //   "forks_url": "https://api.github.com/repos/apersonw/taro-mall/forks",
    //   "keys_url": "https://api.github.com/repos/apersonw/taro-mall/keys{/key_id}",
    //   "collaborators_url": "https://api.github.com/repos/apersonw/taro-mall/collaborators{/collaborator}",
    //   "teams_url": "https://api.github.com/repos/apersonw/taro-mall/teams",
    //   "hooks_url": "https://api.github.com/repos/apersonw/taro-mall/hooks",
    //   "issue_events_url": "https://api.github.com/repos/apersonw/taro-mall/issues/events{/number}",
    //   "events_url": "https://api.github.com/repos/apersonw/taro-mall/events",
    //   "assignees_url": "https://api.github.com/repos/apersonw/taro-mall/assignees{/user}",
    //   "branches_url": "https://api.github.com/repos/apersonw/taro-mall/branches{/branch}",
    //   "tags_url": "https://api.github.com/repos/apersonw/taro-mall/tags",
    //   "blobs_url": "https://api.github.com/repos/apersonw/taro-mall/git/blobs{/sha}",
    //   "git_tags_url": "https://api.github.com/repos/apersonw/taro-mall/git/tags{/sha}",
    //   "git_refs_url": "https://api.github.com/repos/apersonw/taro-mall/git/refs{/sha}",
    //   "trees_url": "https://api.github.com/repos/apersonw/taro-mall/git/trees{/sha}",
    //   "statuses_url": "https://api.github.com/repos/apersonw/taro-mall/statuses/{sha}",
    //   "languages_url": "https://api.github.com/repos/apersonw/taro-mall/languages",
    //   "stargazers_url": "https://api.github.com/repos/apersonw/taro-mall/stargazers",
    //   "contributors_url": "https://api.github.com/repos/apersonw/taro-mall/contributors",
    //   "subscribers_url": "https://api.github.com/repos/apersonw/taro-mall/subscribers",
    //   "subscription_url": "https://api.github.com/repos/apersonw/taro-mall/subscription",
    //   "commits_url": "https://api.github.com/repos/apersonw/taro-mall/commits{/sha}",
    //   "git_commits_url": "https://api.github.com/repos/apersonw/taro-mall/git/commits{/sha}",
    //   "comments_url": "https://api.github.com/repos/apersonw/taro-mall/comments{/number}",
    //   "issue_comment_url": "https://api.github.com/repos/apersonw/taro-mall/issues/comments{/number}",
    //   "contents_url": "https://api.github.com/repos/apersonw/taro-mall/contents/{+path}",
    //   "compare_url": "https://api.github.com/repos/apersonw/taro-mall/compare/{base}...{head}",
    //   "merges_url": "https://api.github.com/repos/apersonw/taro-mall/merges",
    //   "archive_url": "https://api.github.com/repos/apersonw/taro-mall/{archive_format}{/ref}",
    //   "downloads_url": "https://api.github.com/repos/apersonw/taro-mall/downloads",
    //   "issues_url": "https://api.github.com/repos/apersonw/taro-mall/issues{/number}",
    //   "pulls_url": "https://api.github.com/repos/apersonw/taro-mall/pulls{/number}",
    //   "milestones_url": "https://api.github.com/repos/apersonw/taro-mall/milestones{/number}",
    //   "notifications_url": "https://api.github.com/repos/apersonw/taro-mall/notifications{?since,all,participating}",
    //   "labels_url": "https://api.github.com/repos/apersonw/taro-mall/labels{/name}",
    //   "releases_url": "https://api.github.com/repos/apersonw/taro-mall/releases{/id}",
    //   "deployments_url": "https://api.github.com/repos/apersonw/taro-mall/deployments",
    //   "created_at": "2019-03-16T17:13:57Z",
    //   "updated_at": "2020-03-27T03:19:56Z",
    //   "pushed_at": "2020-03-17T20:13:08Z",
    //   "git_url": "git://github.com/apersonw/taro-mall.git",
    //   "ssh_url": "git@github.com:apersonw/taro-mall.git",
    //   "clone_url": "https://github.com/apersonw/taro-mall.git",
    //   "svn_url": "https://github.com/apersonw/taro-mall",
    //   "homepage": "",
    //   "size": 43395,
    //   "stargazers_count": 118,
    //   "watchers_count": 118,
    //   "language": "JavaScript",
    //   "has_issues": true,
    //   "has_projects": true,
    //   "has_downloads": true,
    //   "has_wiki": true,
    //   "has_pages": false,
    //   "forks_count": 37,
    //   "mirror_url": null,
    //   "archived": false,
    //   "disabled": false,
    //   "open_issues_count": 15,
    //   "license": {
    //     "key": "mit",
    //     "name": "MIT License",
    //     "spdx_id": "MIT",
    //     "url": "https://api.github.com/licenses/mit",
    //     "node_id": "MDc6TGljZW5zZTEz"
    //   },
    //   "forks": 37,
    //   "open_issues": 15,
    //   "watchers": 118,
    //   "default_branch": "master",
    //   "permissions": {
    //     "admin": false,
    //     "push": false,
    //     "pull": true
    //   },
    //   "temp_clone_token": "",
    //   "network_count": 37,
    //   "subscribers_count": 17
    // }

    const [hasStared, setHasStared] = useState(false)
    const [hasWatched, setHasWatched] = useState(false)


    const [content, setContent ] = useState('')
    const [name, setName] = useState('')
    const [staticLink, setStaticLink] = useState('')

    const [staring, setStaring] = useState(false)
    const [watching, setWatching] = useState(false)

    useDidShow(()=>{
      getRepoDetails()
    })

    // 下拉刷新
    usePullDownRefresh(()=>{
      getRepoDetails()
    })
    // 上拉加载更多
    useReachBottom( ()=>{
        
    })

    const getRepoDetails = ()=>{
      Taro.showLoading({title: 'Loading...'})
      // GET /repos/:owner/:repo
      request.get(decodeURI(url)).then(res=>{
        if (res.statusCode === HTTP_STATUS.SUCCESS){
          setRepo(res.data)
          setRepoStarCount(res.data.stargazers_count)
          setRepoWatchCount(res.data.subscribers_count)
          getReadMe(res.data.full_name)
          checkStaring(res.data.full_name)
          checkWatching(res.data.full_name)
        }else{
          Taro.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }).catch(err=>{
        Taro.showToast({
          title: err.errMsg,
          icon: 'none',
          success: ()=>{
            Taro.navigateBack()
          }
        }) 
      }).finally(()=>{
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
        Taro.hideToast()
      })
    }

    const getReadMe = (repo_full_name)=>{
      // GET /repos/:owner/:repo/readme
      request.get(`/repos/${repo_full_name}/readme`).then((res)=>{
        setContent(base64_decode(res.data.content))
        setName(res.data.name)
        // setStaticLink(res.data.download_url.replace(/master\/[a-zA-Z\d]+\/[a-zA-Z\d]+\.[a-zA-Z\d]+/, 'master/'))
      })
    }


    const checkStaring = (repo_full_name)=>{
      if(hasLogin()){
        // GET /user/starred/:owner/:repo
        request.get(`/user/starred/${repo_full_name}`).then(res=>{
          setHasStared(res.statusCode === 204)
        })
      }
    }

    const checkWatching = (repo_full_name)=>{
      // GET /user/subscriptions/:owner/:repo
      if(hasLogin()){
        request.get(`/user/subscriptions/${repo_full_name}`).then(res=>{
          setHasWatched(res.statusCode === 204)
        })
      }
    }


    const handleStarAction = ()=>{
      const {full_name } =repo
      if(hasLogin()){
        setStaring(true)
        if(hasStared){ // 已经star
          request.delete(`/user/starred/${full_name}`).then(res=>{
            if(res.statusCode === 204){
              setHasStared(false)
              setRepoStarCount(pre => pre - 1)
            }
          }).finally(()=>{
            setStaring(false)
          })
        }else{
          request.put(`/user/starred/${full_name}`).then(res=>{
            if(res.statusCode === 204){
              setHasStared(true)
              setRepoStarCount(pre => pre + 1)
            }
          }).finally(()=>{
            setStaring(false)
          })
        }
      }else{
        Taro.showToast({
          title: 'Please login in',
          icon: 'none'
        })
      }
    }

    const handleWatchAction = ()=>{
      const {full_name } =repo
      if(hasLogin()){
        setWatching(true)
        if(hasWatched){
          request.delete(`/user/subscriptions/${full_name}`).then(res=>{
            if(res.statusCode === 204){
              setHasWatched(false)
              setRepoWatchCount(pre => pre - 1)
            }
          }).finally(()=>{
            setWatching(false)
          })
        }else{
          request.put(`/user/subscriptions/${full_name}`).then(res=>{
            if(res.statusCode === 204){
              setHasWatched(true)
              setRepoWatchCount(pre => pre + 1)
            }
          }).finally(()=>{
            setWatching(false)
          })
        }
      }
    }

    const items = [
      [
        {
          title: 'Author',
          icon: true,
          value: (repo.owner && repo.owner.login) || '--',
          onClick: ()=>{Taro.navigateTo({url: `/pages/developerInfo/index?username=${(repo.owner && repo.owner.login)}`})}
        },
        {
          title: 'Language',
          value: (repo && repo.language) || '--',
          color: (repo && renderLanguageColor(repo.language)) || ''
        },
        {
          title: 'License',
          value: (repo.license && repo.license.spdx_id) || '--',
        },
      ],
      [
        {
          title: 'Branch',
          value: (repo && repo.default_branch) || '--',
        },
        {
          title: 'View Code',
          icon: true,  
        },
      ],
      [
        {
          title: 'Contributors',
          icon: true
        },
        {
          title: 'Events',
          icon: true
        }
      ]
    ]

  return (
    <View className='page'>
      <View className='repo-bg-view'>
          <Text className='repo-info-title'>{repo.name}</Text>
          {
            repo.fork &&
            <View className='fork'>
              <AtIcon prefixClass='ion' value='ios-git-network' size='15' color='#fff' />
              <Navigator url={'/pages/repos/index?url=' + encodeURI(repo.parent.url)}>
                <Text className='fork-title'>
                  {repo.parent.full_name}
                </Text>
              </Navigator>
            </View>
          }
          <Text className='repo-info-desc'>{repo.description || 'no description'}</Text>
      </View>
      <View className='repo-info-view'>
        <View className='repo-star-watch-view'>
          <View className='repo-star-item' onClick={()=>{ handleStarAction() }}>
            {
              staring ? 
              <ActivityLoading size='21' color='#999' text={hasStared ? 'Unstar' : 'Star'} />
              :
              <View>
                <AtIcon prefixClass='ion' value={hasStared ? 'ios-star-outline' : 'ios-star'} size='25' color='#2d8cf0' />
                <Text className='item-title'>{hasStared ? 'Unstar' : 'Star'}</Text>
              </View>
            }
          </View>
          <View className='line' />
          <View className='repo-watch-item' onClick={()=>{ handleWatchAction()}}>
            {
              watching ? 
              <ActivityLoading size='21' color='#999' text={hasWatched ? 'Unwatch' : 'Watch'} />
              :
              <View>
                <AtIcon prefixClass='ion' value={hasWatched ? 'ios-eye-off' : 'ios-eye'} size='25' color='#2d8cf0' />
                <Text className='item-title'>{hasWatched ? 'Unwatch' : 'Watch'}</Text>
              </View>
            }
          </View>
        </View>
        <View className='repo-number-view' >
          <View 
            className='item-content' 
            onClick={()=>{Taro.navigateTo({url: `/pages/reposuserlist/index?url=${encodeURI(`/repos/${repo.full_name}/stargazers`)}`})}}
          >
            {/* GET /repos/:owner/:repo/stargazers  */}
            <Text className='item-number'>{ repoStarCount || 0}</Text>
            <Text className='item-title'>Stars</Text>
          </View>
          <View 
            className='item-content'
            onClick={()=>{Taro.navigateTo({url: '/pages/issuelist/index?url=' + encodeURI(`/repos/${repo.full_name}/issues`)})}}
          >
            <Text className='item-number'>{(repo && repo.open_issues_count) || 0}</Text>
            <Text className='item-title'>Issues</Text>
          </View>
          <View className='item-content'>
            <Text className='item-number'>{(repo && repo.forks_count) || 0}</Text>
            <Text className='item-title'>Forks</Text>
          </View>
          <View 
            className='item-content' 
            onClick={()=>{Taro.navigateTo({url: `/pages/reposuserlist/index?url=${encodeURI(`/repos/${repo.full_name}/subscribers`)}`})}}
          >
            {/* GET /repos/:owner/:repo/subscribers  */}
            <Text className='item-number'>{ repoWatchCount || 0}</Text>
            <Text className='item-title'>Watchers</Text>
          </View>
        </View>
      </View>
      <ListView list={items} />
      {
        content && 
        <View className='readme'>
          <MarkDown content={content} name={name} />
        </View>
        
      }
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true,
}

export default Index
