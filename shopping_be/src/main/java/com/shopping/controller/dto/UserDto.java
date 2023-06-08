package com.shopping.controller.dto;

import java.util.*;

public record UserDto(Long id, String username, String name, String email, String role, List<CartItemDto> cartItems) {
	
}