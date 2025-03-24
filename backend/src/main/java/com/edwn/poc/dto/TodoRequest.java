package com.edwn.poc.dto;

import lombok.Data;

@Data
public class TodoRequest {
    private String title;
    private String description;
    private boolean completed;
}