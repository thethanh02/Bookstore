package com.shopping.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateReviewRequest {

	@Schema(example = "Chán")
    @NotBlank
    private String commentString;
	
	@Schema(example = "1")
    @NotNull
    private int rating;
    
}