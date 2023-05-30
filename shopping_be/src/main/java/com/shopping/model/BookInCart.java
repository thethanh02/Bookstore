package com.shopping.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "book_in_cart")
public class BookInCart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int amount;
	
//	@ManyToOne
//	@JoinColumn(name = "cart_id")
//	private Cart cart;
//	
//	@ManyToOne
//	@JoinColumn(name = "book_id")
//	private Book book;	
	
}
