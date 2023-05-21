package com.shopping.controller.payload;


public record UserDto(Long id, String username, String name, String email, String role) {
}