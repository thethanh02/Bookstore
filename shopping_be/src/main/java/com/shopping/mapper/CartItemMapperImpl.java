package com.shopping.mapper;

import org.springframework.stereotype.Service;

import com.shopping.controller.dto.BookDto;
import com.shopping.controller.dto.CartItemDto;
import com.shopping.model.*;
import com.shopping.service.*;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CartItemMapperImpl implements CartItemMapper {
	private final CartItemService cartItemService;
	private final BookService bookService;
	private final BookMapper bookMapper;
	
	@Override
	public CartItem toNewCartItem(CartItemDto cartItemDto, User user) {
		if (cartItemDto == null)
			return null;
		Book book = bookService.validateAndGetBookById(cartItemDto.book().id().toString());
		return new CartItem(cartItemDto.quantity(), user, book);
	}

	@Override
	public CartItem toUpdateQuantityCartItem(CartItemDto cartItemDto) {
		if (cartItemDto == null)
			return null;
		CartItem cartItem = cartItemService.validateAndGetCartItemById(cartItemDto.id());
		cartItem.setQuantity(cartItemDto.quantity());
		return cartItem;
	}

	@Override
	public CartItemDto toCartItemDto(CartItem cartItem) {
		if (cartItem == null)
			return null;
		BookDto bookDto = bookMapper.toBookDto(cartItem.getBook());
		return new CartItemDto(cartItem.getId(), cartItem.getQuantity(), bookDto);
	}
	
}
