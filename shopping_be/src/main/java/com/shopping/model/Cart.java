package com.shopping.model;

import java.util.*;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
//	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
//	private Collection<BookInCart> booksInCart;
}
