import React, { useState } from 'react'
import loginService from '../services/login'


function LoginForm(props) {

    const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit');
        try {
            const user = await loginService.login({ username, password })
            console.log('user', user);
            
        }
        catch (exception) {
            console.log('exception', exception);
        }
    }
  return (
    <form onSubmit={handleSubmit}>
            <div>
                username
                <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input type="password" name="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type='submit'>login</button>
        </form>
  )
}

export default LoginForm
