// frontend/hooks/useTodoApi.ts
import { Todo, TodoRequest } from "@/lib/type";
import { useState, useCallback } from "react";

export function useTodoApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use environment variable with fallback for local development
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  const fetchTodos = useCallback(async (): Promise<Todo[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/todos`);

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  const getTodoById = useCallback(
    async (id: string): Promise<Todo | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${backendUrl}/api/todos/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch todo");
        }

        const data = await response.json();
        return data;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [backendUrl],
  );

  const createTodo = useCallback(
    async (todoData: TodoRequest): Promise<Todo | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${backendUrl}/api/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todoData),
        });

        if (!response.ok) {
          throw new Error("Failed to create todo");
        }

        const data = await response.json();
        return data;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [backendUrl],
  );

  const updateTodo = useCallback(
    async (
      id: string,
      todoData: Partial<TodoRequest>,
    ): Promise<Todo | null> => {
      setLoading(true);
      setError(null);

      try {
        // Get the current todo data
        const currentTodo = await getTodoById(id);
        if (!currentTodo) {
          throw new Error("Todo not found");
        }

        // Create a TodoRequest object that matches the backend expectation
        const updateRequest: TodoRequest = {
          title: todoData.title ?? currentTodo.title,
          description: todoData.description ?? currentTodo.description,
          completed:
            todoData.completed !== undefined
              ? todoData.completed
              : currentTodo.completed,
        };

        const response = await fetch(`${backendUrl}/api/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateRequest),
        });

        if (!response.ok) {
          throw new Error("Failed to update todo");
        }

        const data = await response.json();
        return data;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [backendUrl, getTodoById],
  );

  const toggleTodoComplete = useCallback(
    async (id: string): Promise<Todo | null> => {
      setLoading(true);
      setError(null);

      try {
        const currentTodo = await getTodoById(id);
        if (!currentTodo) {
          throw new Error("Todo not found");
        }

        return updateTodo(id, { completed: !currentTodo.completed });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        return null;
      }
    },
    [getTodoById, updateTodo],
  );

  const deleteTodo = useCallback(
    async (id: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${backendUrl}/api/todos/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }

        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [backendUrl],
  );

  return {
    loading,
    error,
    fetchTodos,
    getTodoById,
    createTodo,
    updateTodo,
    toggleTodoComplete,
    deleteTodo,
  };
}
