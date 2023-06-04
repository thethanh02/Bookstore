package com.shopping.controller.payload;

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
	private String paymentMethod;

    private List<CartItemDto> cartItems = new ArrayList<>();
	
}
