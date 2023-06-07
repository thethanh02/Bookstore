package com.shopping.controller.payload;

import java.time.ZonedDateTime;
import java.util.List;

public record OrderDto(Long id, String name, String phoneNum, String address, 
		String paymentMethod, List<OrderItemDto> orderItems, UserDto user, String status,
		ZonedDateTime createdAt, ZonedDateTime confirmedAt, ZonedDateTime deliveredAt, ZonedDateTime canceledAt) {
	
	public record OrderItemDto(Long id, int quantity, BookDto book) {
		
	}
	
	public record UserDto(String username, String name) {
	}
	
}