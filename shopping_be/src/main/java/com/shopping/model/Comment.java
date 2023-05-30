package com.shopping.model;

import java.time.ZonedDateTime;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "comment")
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String commentString;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;
	
    private ZonedDateTime createdAt;

    public Comment(String commentString) {
        this.commentString = commentString;
    }

    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.now();
    }
	
}
