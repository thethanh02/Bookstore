package com.shopping.controller.dto;

import java.sql.Date;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookRequest {
	
	@Schema
	private Long id;
	
	@Schema(example = "Tiêu đề")
	@NotBlank(message = "tiêu đề không được để trống")
	private String title;
	
	@Schema(example = "Tác giả")
	@NotBlank(message = "tác giả không được để trống")
	private String author;
	
	@Schema(example = "Mô tả")
	private String description;
	
	@Schema(example = "2022-02-20")
	@NotNull(message = "ngày phát hành không được để trống")
	private Date releaseDate;
	
	@Schema(example = "100")
	private int pageNum;
	
	@Schema(example = "Khoa học")
	private String category;
	
	@Schema(example = "50000")
	private Long price;
	
	@Schema(example = "img base64 format")
	private String imgUrl;
}

