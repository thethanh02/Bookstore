package com.shopping.controller.payload;

import java.sql.Date;
import java.time.ZonedDateTime;
import java.util.List;

public record BookDto(Long id, String title, String author, String description, Date releaseDate, int pageNum, String category, Long price, String imgUrl, List<CommentDto> comments) {

	public record CommentDto(Long id, String commentString, CommentDto.UserDto user, ZonedDateTime createdAt) {
		public record UserDto(String username) {
	    }
    }
	
}
