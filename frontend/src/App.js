import axios from 'axios'
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Loader from './components/Loader'
import { listTasks, createTask } from './actions/taskActions'

const App = () => {
  const dispatch = useDispatch()

  const [showAddTask, setShowAddTask] = useState(false)
  // const [tasks, setTasks] = useState([])

  const taskList = useSelector(state => state.taskList)
  const { loading, error, tasks} = taskList

  useEffect(() => {
    /*const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }*/
    dispatch(listTasks())
    // getTasks()
  }, [])

  

  // Fetch Tasks
  /*const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/tasks')
    const data = await res.json()

    const {data} = await axios.get(
      `/tasks`
  )
    
    return data
  }*/

  // Fetch Task
  /*const fetchTask = async (id) => {
    // const res = await fetch(`http://localhost:5000/tasks/${id}`)
    // const data = await res.json()

    const {data} = await axios.get(`/tasks/${id}`)

    return data
  }*/

  //Toggle Reminder
  /*const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => 
    task.id === id ? { ...task, reminder: 
      data.reminder } : task))
  }*/

  // Add Task
  /*const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }*/
  const addTask = (task) => {
    dispatch(createTask(task))  
    
    dispatch(listTasks())//may be a better way to refresh 
  }

  // Delete Task
  /*const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }*/

  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {/* {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks Available'} */}
            {loading ? <Loader /> : <Tasks tasks={tasks} /> }
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
