import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "./hooks/useTodos";

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const refAddInput = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const {
    mutate: addTodo,
    error: errorAddTodo,
    isLoading: isLoadingAddTodo,
  } = useMutation<
    Todo, // TData
    Error, // TError
    Todo, // TVariables
    AddTodoContext // Context
  >({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/posts", todo)
        .then((res) => res.data),

    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      // APPROACH 2: Updating the data in the cache
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      if (refAddInput.current) refAddInput.current.value = "";

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      // APPROACH: Invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });
      //
      // APPROACH 2: Updating the data in the cache
      // queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
      //   savedTodo,
      //   ...(todos || []),
      // ]);
      //
      // if (refAddInput.current) refAddInput.current.value = "";

      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });

  return (
    <>
      {errorAddTodo && (
        <div className="alert alert-danger">{errorAddTodo.message}</div>
      )}

      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          if (refAddInput.current && refAddInput.current.value)
            addTodo({
              id: 0,
              title: refAddInput.current.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={refAddInput} type="text" className="form-control" />
        </div>

        <div className="col">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isLoadingAddTodo}
          >
            {isLoadingAddTodo ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
