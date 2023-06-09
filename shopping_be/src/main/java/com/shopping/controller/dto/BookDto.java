package com.shopping.controller.dto;

import java.sql.Date;
import java.util.List;

public record BookDto(Long id, String title, String author, String description, Date releaseDate, int pageNum, String category, Long price, String imgUrl, List<ReviewDto> reviews, int sold) {

}
