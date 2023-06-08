package com.shopping.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderStatusRequest {
	
	@NotNull
	private Long id;
	@NotBlank
	private String status;
	
}
