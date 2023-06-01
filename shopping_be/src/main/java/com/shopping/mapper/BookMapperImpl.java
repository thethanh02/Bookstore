package com.shopping.mapper;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shopping.controller.payload.BookDto;
import com.shopping.model.Book;
import com.shopping.model.Review;

@Service
public class BookMapperImpl implements BookMapper {

	@Override
	public BookDto toBookDto(Book book) {
		if (book == null)
			return null;
		List<BookDto.ReviewDto> reviews = book.getReviews().stream().map(this::toBookDtoReviewDto).toList();
		return new BookDto(book.getId(), book.getTitle(), book.getAuthor(), book.getDescription(), book.getReleaseDate(), book.getPageNum(), book.getCategory(), book.getPrice(), book.getImgUrl(), reviews);
	}

	private BookDto.ReviewDto toBookDtoReviewDto(Review review) {
        if (review == null) {
            return null;
        }
        BookDto.ReviewDto.UserDto userDto = new BookDto.ReviewDto.UserDto(review.getUser().getName());
        return new BookDto.ReviewDto(review.getId(), review.getCommentString(), review.getRating(), userDto, review.getCreatedAt());
    }
	
}
