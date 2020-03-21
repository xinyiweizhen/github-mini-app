import { SET_USERINFO, SET_DEVELOPERINFO, REFERESH_FOLLOWER, CHECK_FOLLOWER, LOADMORE_FOLLOWER } from '../../constant/user'

const INIT_STATE = {
    userInfo: null,
    developerInfo: null,
    followList: [],
    isFollowed: false
}

export default function user(state = INIT_STATE, action){
    switch(action.type){
        case SET_USERINFO : 
            return {
                ...state, 
                userInfo: action.payload.data
            }
        case SET_DEVELOPERINFO: 
            return {
                ...state,
                developerInfo: action.payload.data
            }
        case REFERESH_FOLLOWER: 
            return {
                ...state,
                followList: action.payload.data
            }
        case LOADMORE_FOLLOWER: 
            return {
                ...state,
                followList: state.followList.concat(action.payload.data)
            }
        case CHECK_FOLLOWER:
            return {
                ...state,
                isFollowed: action.payload.statusCode === 204 
            }
        default: 
            return state
    }
}