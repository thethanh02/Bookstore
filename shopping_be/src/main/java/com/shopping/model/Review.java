package com.shopping.model;

import java.time.ZonedDateTime;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "review")
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String commentString;
	private int rating;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;
	
    private ZonedDateTime createdAt;

    public Review(String commentString, int rating) {
        this.commentString = commentString;
        this.rating = rating;
    }

    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.now();
    }
	
}
