package com.shopping.controller.payload;

import java.util.List;

public record CartDto(Long id, List<CartItemDto> cartItems) {
	
	public record CartItemDto(Long id, int quantity, BookDto book) {
		
    }
}