import axios from 'axios'
import { 
    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_FAIL,

    TASK_CREATE_RESET,
   
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,

    TASK_DELETE_REQUEST,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,

    TASK_TOGGLE_REMINDER_REQUEST,
    TASK_TOGGLE_REMINDER_SUCCESS,
    TASK_TOGGLE_REMINDER_FAIL,
} from '../constants/taskConstants'

export const createTask = (task) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_CREATE_REQUEST
        })

        const { 
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/tasks/new`,
            task,
            config
        )

        dispatch({
            type: TASK_CREATE_SUCCESS,
            payload: data
        })


    }catch(error){
        dispatch({
            type: TASK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }

}



export const taskToggle = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_TOGGLE_REMINDER_REQUEST
        })

        const { 
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/tasks/reminder/${id}`,
            config
        )

        dispatch({
            type: TASK_TOGGLE_REMINDER_SUCCESS,
        })


    } catch(error){
        dispatch({
            type: TASK_TOGGLE_REMINDER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }

}



export const taskDelete = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_DELETE_REQUEST
        })

        const { 
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(
            `/tasks/delete/${id}`,
            config
        )

        dispatch({
            type: TASK_DELETE_SUCCESS,
        })


    } catch(error){
        dispatch({
            type: TASK_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }

}



export const listTasks = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_LIST_REQUEST
        })

        const { 
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                // Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/tasks`,
            config
        )

        dispatch({
            type: TASK_LIST_SUCCESS,
            payload: data
        })


    } catch(error){
        dispatch({
            type: TASK_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }

}