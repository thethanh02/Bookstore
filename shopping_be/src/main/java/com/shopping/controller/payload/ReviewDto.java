package com.shopping.controller.payload;

import java.time.ZonedDateTime;

public record ReviewDto(Long id, String description, int rating, ReviewDto.UserDto user, ZonedDateTime createdAt) {

    public record UserDto(String username) {
    }
}
