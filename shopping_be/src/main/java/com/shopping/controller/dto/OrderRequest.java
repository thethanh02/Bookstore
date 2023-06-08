package com.shopping.controller.dto;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrderRequest {
	
	@NotBlank
	private String name;
	@NotBlank
	private String phoneNum;
	@NotBlank
	private String address;
	@NotBlank
	private String paymentMethod;

    private List<CartItemDto> cartItems = new ArrayList<>();
	
}
