package com.shopping.service;

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

}
