package com.shopping.controller.payload;

import java.time.ZonedDateTime;
import java.util.*;

public record UserDto(Long id, String username, String name, String email, String role, List<CommentDto> comments) {
	
	public record CommentDto(Long id, String commentString, ZonedDateTime createdAt) {
    }
	
}