package com.shopping.controller.payload;

import java.util.*;

public record UserDto(Long id, String username, String name, String email, String role, CartDto cart) {
	
	public record CartDto(Long id, List<CartItemDto> cartItems) {
		
    }
}