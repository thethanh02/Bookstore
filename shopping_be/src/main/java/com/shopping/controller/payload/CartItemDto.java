package com.shopping.controller.payload;

public record CartItemDto(Long id, int quantity, BookDto book) {
	
}