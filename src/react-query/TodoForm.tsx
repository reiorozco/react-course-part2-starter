import React, { useRef } from "react";

import useAddTodo from "./hooks/useAddTodo";

const TodoForm = () => {
  const refAddInput = useRef<HTMLInputElement>(null);

  const onAdd = () => {
    if (refAddInput.current) refAddInput.current.value = "";
  };
  const {
    mutate: addTodo,
    error: errorAddTodo,
    isLoading: isLoadingAddTodo,
  } = useAddTodo(onAdd);

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
