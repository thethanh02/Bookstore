package com.shopping.mapper;

import com.shopping.controller.payload.CartItemDto;
import com.shopping.model.CartItem;
import com.shopping.model.User;

public interface CartItemMapper {

	CartItem toNewCartItem(CartItemDto cartItemDto, User user);

	CartItem toUpdateQuantityCartItem(CartItemDto cartItemDto);
	
	CartItemDto toCartItemDto(CartItem cartItem);
}
