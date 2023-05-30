package com.shopping.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;

import com.shopping.controller.payload.*;
import com.shopping.mapper.CommentMapper;
import com.shopping.model.*;
import com.shopping.security.CustomUserDetails;
import com.shopping.service.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comments")
public class CommentController {
	
	private final UserService userService;
	private final BookService bookService;
	private final CommentService commentService;
	private final CommentMapper commentMapper;

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/new/{bookId}")
	public CommentDto createComment(@AuthenticationPrincipal CustomUserDetails currentUser,
							@Valid @RequestBody CreateCommentRequest createCommentRequest,
							@PathVariable String bookId) {
		System.out.println(1);
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		Comment comment = commentMapper.toComment(createCommentRequest);
		comment.setUser(user);
		Book book1 = bookService.validateAndGetBookById(bookId);
		comment.setBook(book1);
		
    	return commentMapper.toCommentDto(commentService.saveComment(comment));
    }
	
}
