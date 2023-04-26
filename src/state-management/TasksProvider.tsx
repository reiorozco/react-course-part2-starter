import React, { ReactNode, useReducer } from "react";

import TasksContext from "./contexts/tasksContext";
import tasksReducer from "./reducers/tasksReducer";

interface Props {
  children: ReactNode;
}

function TasksProvider({ children }: Props) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
