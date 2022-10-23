import React, { useState } from "react";

function RegisterForm(props) {
  const { handleRegister } = props;
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e);
    handleRegister(username, name, password)
    
  }
  return (
    <div>
      <h2>Sign up</h2>
      <p>to enjoy all of our cool features</p>
      <form onSubmit={handleSubmit}>
        <div>
          username: <input type="text" value={username} onChange={ ({target}) => setUsername(target.value)}/>
        </div>
        <div>
          name: <input type="text" value={name} onChange={ ({target}) => setName(target.value) }/>
        </div>
        <div>
          password: <input type="password" value={password} onChange={ ({target}) => setPassword(target.value)}/>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default RegisterForm;
