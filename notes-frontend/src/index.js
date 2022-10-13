import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from './components/RegisterForm'
import Nav from './components/Nav'

const root = ReactDOM.createRoot(document.getElementById("root"));
const [user, setUser] = useState(null)

root.render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={ <LoginForm />}/>
      <Route path="/register" element={ <RegisterForm />}/>
    </Routes>
      
</BrowserRouter>
  
  
);
