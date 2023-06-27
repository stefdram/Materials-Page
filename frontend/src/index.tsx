import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./bootstrap.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  /* React.StrictMode makes sure that the app is running in the correct mode. However, it renders twice in development mode. 
   It is recommended to use it only in development mode. 
   It is not recommended to use it in production mode. */
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
