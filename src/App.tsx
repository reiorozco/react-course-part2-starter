import React, { useReducer } from "react";

import TasksContext from "./state-management/contexts/tasksContext";
import AuthContext from "./state-management/contexts/authContext";
import tasksReducer from "./state-management/reducers/tasksReducer";
import authReducer from "./state-management/reducers/authReducer";

import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";

import "./App.css";

function App() {
  const [tasks, tasksDispatch] = useReducer(tasksReducer, []);
  const [user, authDispatch] = useReducer(authReducer, "");

  return (
    <AuthContext.Provider value={{ user, dispatch: authDispatch }}>
      <TasksContext.Provider value={{ tasks, dispatch: tasksDispatch }}>
        <NavBar />

        <HomePage />
      </TasksContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
