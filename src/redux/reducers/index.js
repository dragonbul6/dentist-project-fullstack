import {combineReducers} from 'redux'
import {SetToken} from './loginReducers/reducers'
import {getPersonInfo,getClass,setCode} from './mainReducers/reducers'


const mainReducers = combineReducers({getPersonInfo,getClass,setCode})
const loginReducers = combineReducers({SetToken})
const reducers = combineReducers({loginReducers,mainReducers})
export default reducers
