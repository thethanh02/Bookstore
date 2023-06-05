package com.shopping.service;

import java.util.List;

import com.shopping.model.CartItem;

public interface CartItemService {

	CartItem validateAndGetCartItemById(Long id);
	
	CartItem saveCartItem(CartItem cartItem);
	
	void deleteCartItem(CartItem cartItem);
	
	void deleteAllCartItem(List<CartItem> cartItems);
	
}
