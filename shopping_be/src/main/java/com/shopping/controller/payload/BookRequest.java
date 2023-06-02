package com.shopping.controller.payload;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookRequest {
	
	private Long id;
	@NotBlank
	private String title;
	@NotBlank
	private String author;
	private String description;
	@NotNull
	private Date releaseDate;
	private int pageNum;
	private String category;
	private Long price;	
	private String imgUrl;
}

