// frontend/components/TodoList.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Todo } from "@/lib/type";

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export function TodoList({
  todos,
  onToggleComplete,
  onDelete,
  loading = false,
}: TodoListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <Card key={index}>
            <CardContent className="flex items-start gap-3 p-4">
              <Skeleton className="h-4 w-4 rounded-sm mt-1" />
              <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-3 w-24 mt-2" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        No todos yet. Add one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Card key={todo.id} className={todo.completed ? "bg-muted/50" : ""}>
          <CardContent className="flex items-start gap-3 p-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggleComplete(todo.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <h3
                className={`font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`mt-1 text-sm ${todo.completed ? "text-muted-foreground/70" : "text-muted-foreground"}`}
                >
                  {todo.description}
                </p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 size={18} />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
