package com.shopping.mapper;

import com.shopping.controller.payload.BookDto;
import com.shopping.model.Book;

public interface BookMapper {
	
    BookDto toBookDto(Book book);    
    
}
