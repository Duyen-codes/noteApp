import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// const promise = axios.get("http://localhost:3001/notes");
// console.log("promise", promise);

// promise.then((response) => console.log(response));

// response object contains data, status code, headers

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
