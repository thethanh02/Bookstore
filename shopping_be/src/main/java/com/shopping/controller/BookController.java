package com.shopping.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shopping.controller.dto.BookDto;
import com.shopping.controller.dto.BookRequest;
import com.shopping.mapper.BookMapper;
import com.shopping.model.Book;
import com.shopping.service.BookService;
import com.shopping.service.CloudinaryService;
import com.shopping.utils.Base64Detect;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import static com.shopping.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final BookMapper bookMapper;
    private final CloudinaryService cloudinaryService;
    
    @GetMapping	
    ResponseEntity<List<BookDto>> getBooks() {
        return ResponseEntity.ok(
        		bookService.getBooks().stream()
	                .map(bookMapper::toBookDto)
	                .collect(Collectors.toList()));
    }
    
    @GetMapping("/{id}")
    BookDto getBook(@PathVariable String id) {
        return bookMapper.toBookDto(bookService.validateAndGetBookById(id));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteBooks(@PathVariable String id) {
        Book book = bookService.validateAndGetBookById(id.toString());
        bookService.deleteBook(book);
        
        try {
    		cloudinaryService.deleteImage(book.getImgUrl());
    		bookService.deleteBook(book);
    		return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
    }
    
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping("/new")
    ResponseEntity<?> createBook(@Valid @RequestBody BookRequest bookRequest) throws URISyntaxException {
    	String imgBase64 = bookRequest.getImgUrl();
    	if (Base64Detect.isBase64(imgBase64)) {
            try {
            	bookRequest.setImgUrl(cloudinaryService.uploadImage(imgBase64, UUID.randomUUID().toString()));
			} catch (Exception e) {
				e.printStackTrace();
			}

    	}
    	Book book = bookMapper.toBook(bookRequest);
    	if (bookService.hasBookWithTitleAndAuthor(book)) {
    		return ResponseEntity.status(HttpStatus.CONFLICT).body("Sách này đã tồn tại");
    	}
    	Book result = bookService.saveBook(book);
    	return ResponseEntity.created(new URI("/api/books/" + result.getId()))
                .body(bookMapper.toBookDto(result));
    }
    
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PutMapping("/{id}")
    ResponseEntity<?> updateBook(@Valid @RequestBody BookRequest bookRequest) {
    	String imgBase64 = bookRequest.getImgUrl();
    	String imgUrlString = bookService.validateAndGetBookById(bookRequest.getId().toString()).getImgUrl();
    	if (Base64Detect.isBase64(imgBase64)) {
    		try {
    			bookRequest.setImgUrl(cloudinaryService.uploadImage(imgBase64, imgUrlString));
			} catch (Exception e) {
				e.printStackTrace();
			}
    	}
    	Book book = bookMapper.toUpdatedBook(bookRequest);
    	if (bookService.hasBookWithTitleAndAuthorAndIdNot(book)) {
    		return ResponseEntity.status(HttpStatus.CONFLICT).body("Sách này đã tồn tại");
    	}
    	Book result = bookService.saveBook(book);
    	return ResponseEntity.ok().body(bookMapper.toBookDto(result));
    }
    
}
