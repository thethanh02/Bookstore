package com.shopping.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shopping.exception.EntityNotFoundException;
import com.shopping.model.CartItem;
import com.shopping.repository.CartItemRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CartItemServiceImpl implements CartItemService {
	private final CartItemRepository cartItemRepository;

	@Override
	public CartItem validateAndGetCartItemById(Long id) {
		return cartItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("CartItem with id %s not found", id)));
	}

	@Override
	public CartItem saveCartItem(CartItem cartItem) {
		return cartItemRepository.save(cartItem);
	}

	@Override
	public void deleteCartItem(CartItem cartItem) {
		cartItemRepository.delete(cartItem);
	}

	@Override
	public void deleteAllCartItem(List<CartItem> cartItems) {
		cartItemRepository.deleteAll(cartItems);
	}

	@Override
	public CartItem validateAndGetCartItemByBookId(List<CartItem> cartItems, Long id) {
		for (CartItem cartItem : cartItems) {
			if (cartItem.getBook().getId() == id)
				return cartItem;
		}
		return null;
	}

}
