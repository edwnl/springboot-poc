package com.edwn.poc.service;

import com.edwn.poc.dto.TodoRequest;
import com.edwn.poc.model.Todo;
import com.edwn.poc.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    public Optional<Todo> findById(String id) {
        return todoRepository.findById(id);
    }

    public List<Todo> findByCompleted(boolean completed) {
        return todoRepository.findByCompleted(completed);
    }

    public Todo create(TodoRequest todoRequest) {
        Todo todo = new Todo();
        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription());
        todo.setCompleted(todoRequest.isCompleted());
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        return todoRepository.save(todo);
    }

    public Optional<Todo> update(String id, TodoRequest todoRequest) {
        return todoRepository.findById(id)
                .map(existingTodo -> {
                    existingTodo.setTitle(todoRequest.getTitle());
                    existingTodo.setDescription(todoRequest.getDescription());
                    existingTodo.setCompleted(todoRequest.isCompleted());
                    existingTodo.setUpdatedAt(LocalDateTime.now());
                    return todoRepository.save(existingTodo);
                });
    }

    public void deleteById(String id) {
        todoRepository.deleteById(id);
    }
}