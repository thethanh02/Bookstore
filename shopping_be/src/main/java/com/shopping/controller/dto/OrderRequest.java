package com.shopping.controller.dto;

import java.util.ArrayList;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class OrderRequest {
	
	@Schema(example = "Thế Thành")
	@Pattern(regexp = "^[\\p{L} .'-]+$", message = "The name field may only contain letters")
	@NotBlank
	private String name;
	
	@Schema(example = "0123456789")
	@Pattern(regexp = "^\\d{10}$", message = "The phoneNum field must contain exactly 10 digits")
	@NotBlank
	private String phoneNum;
	
	@Schema(example = "Hà nội")
	@NotBlank
	private String address;
	
	@Schema(example = "Thanh toán tiền mặt")
	@NotBlank
	private String paymentMethod;

	@Schema
    private List<CartItemDto> cartItems = new ArrayList<>();
	
}
