import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "./hooks/useTodos";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate: addTodo, error: errorAddTodo } = useMutation<
    Todo, // TData
    Error, // TError
    Todo // TVariables
  >({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://xjsonplaceholder.typicode.com/posts", todo)
        .then((res) => res.data),

    onSuccess: (savedTodo, newTodo) => {
      // APPROACH: Invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      // APPROACH 2: Updating the data in the cache
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
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

          if (ref.current && ref.current.value)
            addTodo({
              id: 0,
              title: ref.current.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>

        <div className="col">
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
