// frontend/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { useTodoApi } from "@/hooks/useTodoAPI";
import { Todo } from "@/lib/type";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const {
    loading,
    error,
    fetchTodos,
    createTodo,
    toggleTodoComplete,
    deleteTodo,
  } = useTodoApi();

  // Load todos on initial render
  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
      setIsInitialLoading(false);
    };

    loadTodos();
  }, [fetchTodos]);

  // Show error toast when API errors occur
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAddTodo = async (title: string, description: string) => {
    const newTodo = await createTodo({
      title,
      description,
      completed: false,
    });

    if (newTodo) {
      // Refresh todos
      const updatedTodos = await fetchTodos();
      setTodos(updatedTodos);
      setDialogOpen(false);

      toast.success("Your todo has been added successfully.");
    }
  };

  const handleToggleComplete = async (id: string) => {
    const updatedTodo = await toggleTodoComplete(id);

    if (updatedTodo) {
      // Update the todo in our local state
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );

      toast.success(
        `Todo marked as ${updatedTodo.completed ? "completed" : "incomplete"}.`,
      );
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteTodo(id);

    if (success) {
      // Remove the todo from our local state
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));

      toast.success("Your todo has been deleted successfully.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-3xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">Todo List</CardTitle>
            <Button onClick={() => setDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Todo
            </Button>
          </CardHeader>
          <CardContent>
            <TodoForm
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              onSubmit={handleAddTodo}
            />

            <TodoList
              todos={todos}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              loading={loading || isInitialLoading}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
