package com.shopping.controller.payload;

import java.time.ZonedDateTime;

public record CommentDto(Long id, String description, CommentDto.UserDto user, ZonedDateTime createdAt) {

    public record UserDto(String username) {
    }
}
