package com.shopping.mapper;

import org.springframework.stereotype.Service;

import com.shopping.controller.payload.BookDto;
import com.shopping.model.Book;

@Service
public class BookMapperImpl implements BookMapper {

	@Override
	public BookDto toBookDto(Book book) {
		if (book == null)
			return null;
		return new BookDto(book.getId(), book.getTitle(), book.getAuthor(), book.getDescription(), book.getReleaseDate(), book.getPageNum(), book.getCategory(), book.getImgUrl());
	}

	
}
