package com.shopping.mapper;

import com.shopping.controller.payload.CartItemDto;
import com.shopping.model.Cart;
import com.shopping.model.CartItem;

public interface CartItemMapper {

	CartItem toNewCartItem(CartItemDto cartItemDto, Cart cart);

	CartItem toUpdateQuantityCartItem(CartItemDto cartItemDto);
	
	CartItemDto toCartItemDto(CartItem cartItem);
}
