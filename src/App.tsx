import React, { useReducer } from "react";

import TasksContext from "./state-management/contexts/tasksContext";
import tasksReducer from "./state-management/reducers/tasksReducer";
import AuthProvider from "./state-management/AuthProvider";

import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";

import "./App.css";

function App() {
  const [tasks, tasksDispatch] = useReducer(tasksReducer, []);

  return (
    <AuthProvider>
      <TasksContext.Provider value={{ tasks, dispatch: tasksDispatch }}>
        <NavBar />

        <HomePage />
      </TasksContext.Provider>
    </AuthProvider>
  );
}

export default App;
