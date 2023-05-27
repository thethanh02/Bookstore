package com.shopping.model;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "books")
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	private String author;
	private String description;
	private Date releaseDate;
	private int pageNum;
	private String category;
	private Long price;	
	private String imgUrl;
	
}
