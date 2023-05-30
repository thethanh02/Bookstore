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
	
//	@OneToMany(mappedBy = "books", cascade = CascadeType.ALL)
//	private Collection<BookInCart> booksInCart;
	
	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
	
	public void addComment(Comment comment) {
    	if (this.comments == null)
    		this.comments = new ArrayList<>();
    	this.comments.add(comment);
    }
	
}
