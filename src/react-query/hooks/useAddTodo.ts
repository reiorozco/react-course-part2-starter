import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CACHE_KEY_TODOS } from "../constans";
import todoService, { Todo } from "../../services/todoService";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<
    Todo, // TData
    Error, // TError
    Todo, // TVariables
    AddTodoContext // TContext
  >({
    mutationFn: todoService.post,

    onMutate: (newTodo: Todo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      // APPROACH 2: Updating the data in the cache
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);

      // if (refAddInput.current) refAddInput.current.value = "";

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      // APPROACH: Invalidating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      onAdd();

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};

export default useAddTodo;
