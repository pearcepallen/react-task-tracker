import Task from './Task'
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listTasks } from '../actions/taskActions'


const Tasks = ({ tasks, onDelete, onToggle}) => {
    
    return (
        <>
            {tasks.map((task) => (
                <Task key ={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/> 
            ))}
        </>
    )
}

export default Tasks
