import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../actions/userActions'
import {Link} from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!username)
        {
            alert('Please enter credentials')
            return
        }

        dispatch(login(username, password))


        setUsername('')
        setPassword('')
    }

    return (
        <div>
            
            <div>
                <Link to='/'>Go Back</Link>
            </div>

            <form className='add-form' onSubmit={onSubmit}>
                <div className ='form-control'>
                    <label>Username</label>
                    <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>     
                <div className ='form-control'>
                    <label>Password</label>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                
                <input type='submit' value='Login' className='btn btn-block'></input>    
            </form>
            
        </div>
    )
}

export default Login
