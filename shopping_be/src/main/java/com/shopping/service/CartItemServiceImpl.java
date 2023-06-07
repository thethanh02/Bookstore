package com.shopping.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.shopping.exception.EntityNotFoundException;
import com.shopping.model.*;
import com.shopping.repository.CartItemRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CartItemServiceImpl implements CartItemService {
	private final CartItemRepository cartItemRepository;

	@PersistenceContext
	private EntityManager entityManager;
	
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
	@Transactional
	public void deleteAllCartItemsByUser(User user) {
		entityManager.createQuery("DELETE FROM CartItem c WHERE c.user = :user")
	        .setParameter("user", user)
	        .executeUpdate();
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
