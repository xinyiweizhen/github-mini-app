import { createStore, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import rootReducers from './reducers'

const middlewares = [
    createLogger()
]

export default createStore(rootReducers, applyMiddleware(...middlewares))