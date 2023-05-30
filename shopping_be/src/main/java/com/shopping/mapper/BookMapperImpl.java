package com.shopping.mapper;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shopping.controller.payload.BookDto;
import com.shopping.model.Book;
import com.shopping.model.Comment;

@Service
public class BookMapperImpl implements BookMapper {

	@Override
	public BookDto toBookDto(Book book) {
		if (book == null)
			return null;
		List<BookDto.CommentDto> comments = book.getComments().stream().map(this::toBookDtoCommentDto).toList();
		return new BookDto(book.getId(), book.getTitle(), book.getAuthor(), book.getDescription(), book.getReleaseDate(), book.getPageNum(), book.getCategory(), book.getPrice(), book.getImgUrl(), comments);
	}

	private BookDto.CommentDto toBookDtoCommentDto(Comment comment) {
        if (comment == null) {
            return null;
        }
        BookDto.CommentDto.UserDto userDto = new BookDto.CommentDto.UserDto(comment.getUser().getUsername());
        return new BookDto.CommentDto(comment.getId(), comment.getCommentString(), userDto, comment.getCreatedAt());
    }
	
}
