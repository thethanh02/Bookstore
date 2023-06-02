package com.shopping.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.shopping.exception.EntityNotFoundException;
import com.shopping.model.Book;
import com.shopping.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {
	private final BookRepository bookRepository;

	@Override
	public List<Book> getBooks() {
		List<Book> listBooks = bookRepository.findAll();
		return listBooks;
	}
	
	@Override
	public Optional<Book> getBookById(String id) {
		return bookRepository.findById(Long.valueOf(id));
	}
	
	@Override
    public Book validateAndGetBookById(String id) {
        return getBookById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Book with id %s not found", id)));
    }

	@Override
	public Book saveBook(Book book) {
		bookRepository.save(book);
		return book;
	}

	@Override
	public void deleteBook(Book book) {
		bookRepository.delete(book);
	}

}
