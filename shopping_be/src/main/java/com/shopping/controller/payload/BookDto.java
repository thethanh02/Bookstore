package com.shopping.controller.payload;

import java.sql.Date;
import java.time.ZonedDateTime;
import java.util.List;

public record BookDto(Long id, String title, String author, String description, Date releaseDate, int pageNum, String category, Long price, String imgUrl, List<ReviewDto> reviews) {

	public record ReviewDto(Long id, String commentString, int rating, ReviewDto.UserDto user, ZonedDateTime createdAt) {
		
		public record UserDto(String username, String name) {
			
	    }
    }
}
