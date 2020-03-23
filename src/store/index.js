import { createStore, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducers from './reducers'

const middlewares = [
    thunk,
    createLogger()
]

export default createStore(rootReducers, applyMiddleware(...middlewares))