package com.shopping.mapper;

import com.shopping.controller.dto.BookDto;
import com.shopping.controller.dto.BookRequest;
import com.shopping.model.Book;

public interface BookMapper {
	
	Book toBook(BookRequest createBookRequest);
    
	BookDto toBookDto(Book book);
    
	Book toUpdatedBook(BookRequest updateBookRequest);
}
