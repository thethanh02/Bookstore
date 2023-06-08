package com.shopping.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateReviewRequest {

    @NotBlank
    private String commentString;
    @NotNull
    private int rating;
    
}