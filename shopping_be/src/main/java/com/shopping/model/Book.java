package com.shopping.model;

import java.sql.Date;
import java.util.*;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "book")
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
	
	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();
	
	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CartItem> cartItems = new ArrayList<>();
	
	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> orderItems = new ArrayList<>();

	public Book(String title, String author, String description, Date releaseDate, int pageNum, String category,
			Long price, String imgUrl) {
		this.title = title;
		this.author = author;
		this.description = description;
		this.releaseDate = releaseDate;
		this.pageNum = pageNum;
		this.category = category;
		this.price = price;
		this.imgUrl = imgUrl;
	}

	public void setOldAtt(String title, String author, String description, Date releaseDate, int pageNum, String category,
			Long price, String imgUrl) {
		this.title = title;
		this.author = author;
		this.description = description;
		this.releaseDate = releaseDate;
		this.pageNum = pageNum;
		this.category = category;
		this.price = price;
		this.imgUrl = imgUrl;
	}
	
}
