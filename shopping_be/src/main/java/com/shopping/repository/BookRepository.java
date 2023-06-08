package com.shopping.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopping.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	
	boolean existsByTitleAndAuthor(String title, String author);
	
	boolean existsByTitleAndAuthorAndIdNot(String title, String author, Long id);
	
}
