package com.shopping.mapper;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shopping.controller.dto.BookDto;
import com.shopping.controller.dto.BookRequest;
import com.shopping.controller.dto.ReviewDto;
import com.shopping.model.Book;
import com.shopping.model.OrderItem;
import com.shopping.model.Review;
import com.shopping.service.BookService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BookMapperImpl implements BookMapper {
	private final BookService bookService;
	
	@Override
	public Book toBook(BookRequest createBookRequest) {
		if (createBookRequest == null) {
            return null;
        }
        return new Book(createBookRequest.getTitle(), createBookRequest.getAuthor(), createBookRequest.getDescription(), 
        		createBookRequest.getReleaseDate(), createBookRequest.getPageNum(), createBookRequest.getCategory(), createBookRequest.getPrice(), createBookRequest.getImgUrl());
	}
	
	@Override
	public BookDto toBookDto(Book book) {
		if (book == null)
			return null;
		List<ReviewDto> reviews = book.getReviews().stream().map(this::toBookDtoReviewDto).toList();
		int sold = 0;
		for (OrderItem orderItem : book.getOrderItems()) {
			if (orderItem.getOrder().getStatus().equals("Đã giao hàng")) {
				sold += 1;
			}
		}
		return new BookDto(book.getId(), book.getTitle(), book.getAuthor(), book.getDescription(), book.getReleaseDate(), book.getPageNum(), book.getCategory(), book.getPrice(), book.getImgUrl(), reviews, sold);
	}

	private ReviewDto toBookDtoReviewDto(Review review) {
        if (review == null) {
            return null; 
        }
        ReviewDto.UserDto userDto = new ReviewDto.UserDto(review.getUser().getUsername(), review.getUser().getName());
        return new ReviewDto(review.getId(), review.getCommentString(), review.getRating(), userDto, review.getCreatedAt());
    }

	@Override
	public Book toUpdatedBook(BookRequest updateBookRequest) {
		if (updateBookRequest == null) {
            return null;
        }
		Book book = bookService.validateAndGetBookById(updateBookRequest.getId().toString());

		book.setOldAtt(updateBookRequest.getTitle(), updateBookRequest.getAuthor(), updateBookRequest.getDescription(), updateBookRequest.getReleaseDate(), 
				updateBookRequest.getPageNum(), updateBookRequest.getCategory(), updateBookRequest.getPrice(), updateBookRequest.getImgUrl());
		return book;
	}
	
}
