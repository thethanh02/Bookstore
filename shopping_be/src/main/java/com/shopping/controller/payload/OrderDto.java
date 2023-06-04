package com.shopping.controller.payload;

import java.util.List;

public record OrderDto(Long id, String name, String phoneNum, String address, String paymentMethod, List<OrderItemDto> orderItems) {
	
	public record OrderItemDto(Long id, int quantity, BookDto book) {
		
	}
}