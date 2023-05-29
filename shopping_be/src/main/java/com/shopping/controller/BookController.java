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

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shopping.Base64Detect;
import com.shopping.controller.payload.BookDto;
import com.shopping.mapper.BookMapper;
import com.shopping.model.Book;
import com.shopping.service.BookService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final BookMapper bookMapper;
    
    @GetMapping
    List<BookDto> getBooks() {
        return bookService.getBooks().stream()
                .map(bookMapper::toBookDto)
                .collect(Collectors.toList());
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
    ResponseEntity<Book> createBook(@Valid @RequestBody Book book) throws URISyntaxException {
    	String imgBase64 = book.getImgUrl();
    	if (Base64Detect.isBase64(imgBase64)) {
            byte[] decodedBytes = Base64.getDecoder().decode(imgBase64);
            try {
            	String randomName = UUID.randomUUID().toString();
            	String outputFilePath = "../shopping_fe/public/imgs/book" + randomName + ".jpg";
            	Path outputPath = Paths.get(outputFilePath);
				Files.write(outputPath, decodedBytes);
				
				String imgUrlString = "/imgs/book" + randomName + ".jpg";
				book.setImgUrl(imgUrlString);
			} catch (IOException e) {
				e.printStackTrace();
			}

    	}
    	
    	Book result = bookService.saveBook(book);
    	return ResponseEntity.created(new URI("/api/books/" + result.getId()))
                .body(result);
    }
    
    @PutMapping("/{id}")
    ResponseEntity<Book> updateBook(@Valid @RequestBody Book book) throws URISyntaxException {
    	String imgBase64 = book.getImgUrl();
    	String imgUrlString = bookService.validateAndGetBookById(book.getId().toString()).getImgUrl();
    	if (Base64Detect.isBase64(imgBase64)) {
            byte[] decodedBytes = Base64.getDecoder().decode(imgBase64);
            String outputFilePath = "../shopping_fe/public" + imgUrlString;
            try {
            	Path outputPath = Paths.get(outputFilePath);
				Files.write(outputPath, decodedBytes);
				
				book.setImgUrl(imgUrlString);
			} catch (IOException e) {
				e.printStackTrace();
			}

    	}
    	
    	Book result = bookService.saveBook(book);
    	return ResponseEntity.ok().body(result);
    }
    
}
