package com.shopping.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderStatusRequest {
	
	@Schema(example = "1")
	@NotNull
	private Long id;
	
	@Schema(example = "Đã hủy đơn")
	@NotBlank
	private String status;
	
}
