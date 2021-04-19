import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {taskCreateReducer, taskListReducer } from './reducers/taskReducers'


const reducer = combineReducers({
    taskCreate: taskCreateReducer,
    taskList: taskListReducer,
})


// const initialState = {
//     taskCreate:{},
// }

const middleware = [thunk]

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store