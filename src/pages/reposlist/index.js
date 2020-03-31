import Taro, { useState, useRouter, useEffect, usePullDownRefresh, useReachBottom, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RepoItem  from '../../components/repos/repoItem'
import LoadMore from '../../components/common/loadMore'
import request from '../../api/request'
import { REFRESH_STATUS, PRE_PAGE } from '../../constant/global'
import './index.less'


const Index =  ()=> {
    const [reposList, setReposList] = useState([
      {
        "id": 176001214,
        "node_id": "MDEwOlJlcG9zaXRvcnkxNzYwMDEyMTQ=",
        "name": "taro-mall",
        "full_name": "apersonw/taro-mall",
        "private": false,
        "owner": {
          "login": "apersonw",
          "id": 21074939,
          "node_id": "MDQ6VXNlcjIxMDc0OTM5",
          "avatar_url": "https://avatars0.githubusercontent.com/u/21074939?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/apersonw",
          "html_url": "https://github.com/apersonw",
          "followers_url": "https://api.github.com/users/apersonw/followers",
          "following_url": "https://api.github.com/users/apersonw/following{/other_user}",
          "gists_url": "https://api.github.com/users/apersonw/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/apersonw/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/apersonw/subscriptions",
          "organizations_url": "https://api.github.com/users/apersonw/orgs",
          "repos_url": "https://api.github.com/users/apersonw/repos",
          "events_url": "https://api.github.com/users/apersonw/events{/privacy}",
          "received_events_url": "https://api.github.com/users/apersonw/received_events",
          "type": "User",
          "site_admin": false
        },
        "html_url": "https://github.com/apersonw/taro-mall",
        "description": "一个项目的架构，包括设计/前端/管理后台/后端/k8s集群架构，欢迎Star，欢迎Fork",
        "fork": false,
        "url": "https://api.github.com/repos/apersonw/taro-mall",
        "forks_url": "https://api.github.com/repos/apersonw/taro-mall/forks",
        "keys_url": "https://api.github.com/repos/apersonw/taro-mall/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/apersonw/taro-mall/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/apersonw/taro-mall/teams",
        "hooks_url": "https://api.github.com/repos/apersonw/taro-mall/hooks",
        "issue_events_url": "https://api.github.com/repos/apersonw/taro-mall/issues/events{/number}",
        "events_url": "https://api.github.com/repos/apersonw/taro-mall/events",
        "assignees_url": "https://api.github.com/repos/apersonw/taro-mall/assignees{/user}",
        "branches_url": "https://api.github.com/repos/apersonw/taro-mall/branches{/branch}",
        "tags_url": "https://api.github.com/repos/apersonw/taro-mall/tags",
        "blobs_url": "https://api.github.com/repos/apersonw/taro-mall/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/apersonw/taro-mall/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/apersonw/taro-mall/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/apersonw/taro-mall/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/apersonw/taro-mall/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/apersonw/taro-mall/languages",
        "stargazers_url": "https://api.github.com/repos/apersonw/taro-mall/stargazers",
        "contributors_url": "https://api.github.com/repos/apersonw/taro-mall/contributors",
        "subscribers_url": "https://api.github.com/repos/apersonw/taro-mall/subscribers",
        "subscription_url": "https://api.github.com/repos/apersonw/taro-mall/subscription",
        "commits_url": "https://api.github.com/repos/apersonw/taro-mall/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/apersonw/taro-mall/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/apersonw/taro-mall/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/apersonw/taro-mall/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/apersonw/taro-mall/contents/{+path}",
        "compare_url": "https://api.github.com/repos/apersonw/taro-mall/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/apersonw/taro-mall/merges",
        "archive_url": "https://api.github.com/repos/apersonw/taro-mall/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/apersonw/taro-mall/downloads",
        "issues_url": "https://api.github.com/repos/apersonw/taro-mall/issues{/number}",
        "pulls_url": "https://api.github.com/repos/apersonw/taro-mall/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/apersonw/taro-mall/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/apersonw/taro-mall/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/apersonw/taro-mall/labels{/name}",
        "releases_url": "https://api.github.com/repos/apersonw/taro-mall/releases{/id}",
        "deployments_url": "https://api.github.com/repos/apersonw/taro-mall/deployments",
        "created_at": "2019-03-16T17:13:57Z",
        "updated_at": "2020-03-27T03:19:56Z",
        "pushed_at": "2020-03-17T20:13:08Z",
        "git_url": "git://github.com/apersonw/taro-mall.git",
        "ssh_url": "git@github.com:apersonw/taro-mall.git",
        "clone_url": "https://github.com/apersonw/taro-mall.git",
        "svn_url": "https://github.com/apersonw/taro-mall",
        "homepage": "",
        "size": 43395,
        "stargazers_count": 118,
        "watchers_count": 118,
        "language": "JavaScript",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 37,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 15,
        "license": {
          "key": "mit",
          "name": "MIT License",
          "spdx_id": "MIT",
          "url": "https://api.github.com/licenses/mit",
          "node_id": "MDc6TGljZW5zZTEz"
        },
        "forks": 37,
        "open_issues": 15,
        "watchers": 118,
        "default_branch": "master",
        "permissions": {
          "admin": false,
          "push": false,
          "pull": true
        }
      },
    ])

    const [params, setParams] = useState({
      page: 1,
      per_page: PRE_PAGE,
      type: 'owner',
      sort: 'updated'
    })

    const [status, setStatus] = useState(REFRESH_STATUS.NORMAL)

    const router = useRouter()


    const { url } = router.params

    useEffect(()=>{
      // getReposList()
      }, [params])


    /**
     * 请求仓库列表
     * 
     * @param {*} url 
     * @param {*} params 
     */
    const getReposList = ()=>{
      Taro.showLoading({title: 'Loading...'})
      request.get( decodeURI(url), params).then((res)=>{
        if(params.page === 1){
          setReposList(res.data)
        }else {
          setReposList([...reposList, ...res.data])
        }
        setStatus( res.data.length < PRE_PAGE ?  REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL )
      }).finally(()=>{
        Taro.stopPullDownRefresh()
        Taro.hideLoading()
      })
    }


    // 下拉刷新
    usePullDownRefresh(()=>{
      setStatus(REFRESH_STATUS.REFRESHING)
      setParams((preParams)=> ({...preParams, page : 1}))
    })
    // 上拉加载更多
    useReachBottom( ()=>{
        if(status !== REFRESH_STATUS.NO_MORE_DATA){
            setParams((preParams)=> ({...preParams, page : preParams.page + 1}))
        }
    })

  return (
    <View className='page'>
      {
          reposList && reposList.map((item, index)=>(
            <View key={index} onClick={()=>Taro.navigateTo({url: `/pages/repos/index?url=${encodeURI(item.url)}`})}>
              <RepoItem item={item} />
            </View>
          ))
      }
      <LoadMore  status={status} />
    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#24292e',
  navigationBarTextStyle: 'white',
  enablePullDownRefresh: true,
}

export default Index
