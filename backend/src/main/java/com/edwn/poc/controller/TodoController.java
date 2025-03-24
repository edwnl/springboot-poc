package com.edwn.poc.controller;

import com.edwn.poc.dto.TodoRequest;
import com.edwn.poc.model.Todo;
import com.edwn.poc.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        return ResponseEntity.ok(todoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable String id) {
        return todoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status")
    public ResponseEntity<List<Todo>> getTodosByStatus(@RequestParam boolean completed) {
        return ResponseEntity.ok(todoService.findByCompleted(completed));
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody TodoRequest todoRequest) {
        Todo createdTodo = todoService.create(todoRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String id, @RequestBody TodoRequest todoRequest) {
        return todoService.update(id, todoRequest)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String id) {
        todoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}