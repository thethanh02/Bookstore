package com.shopping.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
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
        return bookMapper.toBookDto(book);
    }
    
    @PostMapping("/new")
    ResponseEntity<Book> createBook(@Valid @RequestBody Book book) throws URISyntaxException {
    	String imgBase64 = book.getImgUrl();
    	if (Base64Detect.isBase64(imgBase64)) {
            byte[] decodedBytes = Base64.getDecoder().decode(imgBase64);
            String outputFilePath = "../shopping_fe/public/imgs/book" + book.getId() + ".jpg";
            try {
            	Path outputPath = Paths.get(outputFilePath);
				Files.write(outputPath, decodedBytes);
				
				String imgUrlString = "/imgs/book" + book.getId() + ".jpg";
				book.setImgUrl(imgUrlString);
				
				System.out.println("Tệp ảnh đã được lưu thành công.");
			} catch (IOException e) {
				e.printStackTrace();
			}

    	}
    	
    	Book result = bookService.saveBook(book);
    	return ResponseEntity.created(new URI("/api/laptops/" + result.getId()))
                .body(result);
    }
    
    @PutMapping("/{id}")
    ResponseEntity<Book> updateBook(@Valid @RequestBody Book book) throws URISyntaxException {
    	String imgBase64 = book.getImgUrl();
    	if (Base64Detect.isBase64(imgBase64)) {
            byte[] decodedBytes = Base64.getDecoder().decode(imgBase64);
            String outputFilePath = "../shopping_fe/public/imgs/book" + book.getId() + ".jpg";
            try {
            	Path outputPath = Paths.get(outputFilePath);
				Files.write(outputPath, decodedBytes);
				
				String imgUrlString = "/imgs/book" + book.getId() + ".jpg";
				book.setImgUrl(imgUrlString);
				
				System.out.println("Tệp ảnh đã được lưu thành công.");
			} catch (IOException e) {
				e.printStackTrace();
			}

    	}
    	
    	Book result = bookService.saveBook(book);
    	return ResponseEntity.ok().body(result);
    }
    
}
