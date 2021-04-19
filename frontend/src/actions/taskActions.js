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
} from '../constants/taskConstants'

export const createTask = (task) => async (dispatch, getState) => {
    try{
        dispatch({
            type: TASK_CREATE_REQUEST
        })

        // const { 
        //     userLogin: {userInfo}
        // } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                // Authorization: `Bearer ${userInfo.token}`
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

        // dispatch({
        //     type: CART_CLEAR_ITEMS,
        //     payload: data
        // })

        // localStorage.removeItem('cartItems')


    }catch(error){
        dispatch({
            type: TASK_CREATE_FAIL,
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

        // const { 
        //     userLogin: {userInfo},
        // } = getState()

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