package com.shopping.controller.dto;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookRequest {
	
	private Long id;
	@NotBlank(message = "tiêu đề không được để trống")
	private String title;
	@NotBlank(message = "tác giả không được để trống")
	private String author;
	private String description;
	@NotNull(message = "ngày phát hành không được để trống")
	private Date releaseDate;
	private int pageNum;
	private String category;
	private Long price;	
	private String imgUrl;
}

