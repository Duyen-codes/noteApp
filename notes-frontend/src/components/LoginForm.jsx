import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const { handleLogin } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login form submitted");
    console.log("username", username, "password", password);
    handleLogin(username, password);
    setUsername("");
    setPassword("");
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;
