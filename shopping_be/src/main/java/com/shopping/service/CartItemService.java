package com.shopping.service;

import java.util.*;

import com.shopping.model.*;

public interface CartItemService {

	CartItem validateAndGetCartItemById(Long id);
	
	CartItem saveCartItem(CartItem cartItem);
	
	void deleteCartItem(CartItem cartItem);
	
	void deleteAllCartItemsByUser(User user);
	
	CartItem validateAndGetCartItemByBookId(List<CartItem> cartItems, Long id);
	
}
