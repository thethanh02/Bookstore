package com.shopping.service;

import com.shopping.model.CartItem;

public interface CartItemService {

	CartItem validateAndGetCartItemById(Long id);
	
	CartItem saveCartItem(CartItem cartItem);
	
	void deleteCartItem(CartItem cartItem);
	
}
