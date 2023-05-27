package com.shopping.controller.payload;

import java.sql.Date;

public record BookDto(Long id, String title, String author, String description, Date releaseDate, int pageNum, String category, Long price, String imgUrl) {

}
