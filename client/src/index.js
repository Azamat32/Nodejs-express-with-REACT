import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserStore from "./store/UserStore";
import App from "./App";
const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
