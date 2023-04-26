import React from "react";

import AuthProvider from "./state-management/AuthProvider";
import TasksProvider from "./state-management/TasksProvider";

import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <NavBar />

        <HomePage />
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
