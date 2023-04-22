import { useQuery } from "@tanstack/react-query";

import todoService, { Todo } from "../../services/todoService";
import { CACHE_KEY_TODOS } from "../constans";

const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: 10 * 1000, // 10s
  });

export default useTodos;
