package com.shopping.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.shopping.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import org.springframework.http.HttpStatus;

import com.shopping.controller.dto.*;
import com.shopping.mapper.ReviewMapper;
import com.shopping.model.*;
import com.shopping.security.CustomUserDetails;
import com.shopping.service.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
	
	private final UserService userService;
	private final BookService bookService;
	private final ReviewService reviewService;
	private final ReviewMapper reviewMapper;

	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/new/{bookId}")
	public ReviewDto Review(@AuthenticationPrincipal CustomUserDetails currentUser,
							@Valid @RequestBody CreateReviewRequest createReviewRequest,
							@PathVariable String bookId) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		Review review = reviewMapper.toReview(createReviewRequest);
		review.setUser(user);
		Book book1 = bookService.validateAndGetBookById(bookId);
		review.setBook(book1);
		
    	return reviewMapper.toReviewDto(reviewService.saveReview(review));
    }
	
}
