package com.shopping.service;

import java.util.List;
import java.util.Optional;

import com.shopping.model.Book;


public interface BookService {
	
	List<Book> getBooks();
	
	Optional<Book> getBookById(String id);
	
	Book validateAndGetBookById(String id);
	
	Book saveBook(Book book);
	
	void deleteBook(Book book);
	
	boolean hasBookWithTitleAndAuthor(Book book);
	
	boolean hasBookWithTitleAndAuthorAndIdNot(Book book);
	
}
