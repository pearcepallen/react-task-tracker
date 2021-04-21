import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {taskCreateReducer, taskListReducer } from './reducers/taskReducers'
import {userLoginReducer, userRegisterReducer } from './reducers/userReducers'


const reducer = combineReducers({
    taskCreate: taskCreateReducer,
    taskList: taskListReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})


// const initialState = {
//     taskCreate:{},
// }

const middleware = [thunk]

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store