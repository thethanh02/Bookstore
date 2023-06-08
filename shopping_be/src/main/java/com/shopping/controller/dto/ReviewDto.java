package com.shopping.controller.dto;

import java.time.ZonedDateTime;

public record ReviewDto(Long id, String commentString, int rating, ReviewDto.UserDto user, ZonedDateTime createdAt) {

    public record UserDto(String username, String name) {
    }
}
