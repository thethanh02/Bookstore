package com.shopping.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
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
import com.shopping.utils.Base64Detect;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final BookMapper bookMapper;
    
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

    @DeleteMapping("/{id}")
    BookDto deleteBooks(@PathVariable String id) {
        Book book = bookService.validateAndGetBookById(id.toString());
        bookService.deleteBook(book);
        
        String filePath = "../shopping_fe/public" + book.getImgUrl();
        Path path = Paths.get(filePath);
        try {
            Files.delete(path);
        } catch (Exception e) {
            System.err.println("Không thể xóa file: " + e.getMessage());
        }
        return bookMapper.toBookDto(book);
    }
    
    @PostMapping("/new")
    ResponseEntity<?> createBook(@Valid @RequestBody BookRequest bookRequest) throws URISyntaxException {
    	String imgBase64 = bookRequest.getImgUrl();
    	if (Base64Detect.isBase64(imgBase64)) {
            byte[] decodedBytes = Base64.getDecoder().decode(imgBase64);
            try {
            	String randomName = UUID.randomUUID().toString();
            	String outputFilePath = "../shopping_fe/public/imgs/book" + randomName + ".jpg";
            	Path outputPath = Paths.get(outputFilePath);
				Files.write(outputPath, decodedBytes);
				
				String imgUrlString = "/imgs/book" + randomName + ".jpg";
				bookRequest.setImgUrl(imgUrlString);
			} catch (IOException e) {
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
    
    @PutMapping("/{id}")
    ResponseEntity<?> updateBook(@Valid @RequestBody BookRequest bookRequest) {
    	String imgBase64 = bookRequest.getImgUrl();
    	String imgUrlString = bookService.validateAndGetBookById(bookRequest.getId().toString()).getImgUrl();
    	if (Base64Detect.isBase64(imgBase64)) {
            byte[] decodedBytes = Base64.getDecoder().decode(imgBase64);
            String outputFilePath = "../shopping_fe/public" + imgUrlString;
            try {
            	Path outputPath = Paths.get(outputFilePath);
				Files.write(outputPath, decodedBytes);
				
				bookRequest.setImgUrl(imgUrlString);
			} catch (IOException e) {
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
