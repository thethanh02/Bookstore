package com.shopping.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.shopping.controller.payload.*;
import com.shopping.mapper.*;
import com.shopping.model.*;
import com.shopping.security.CustomUserDetails;
import com.shopping.service.*;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cartitem")
public class CartItemController {
	private final UserService userService;
	private final CartItemService cartItemService;
	private final CartItemMapper cartItemMapper;

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/new")
	public CartItemDto addCartItem(@AuthenticationPrincipal CustomUserDetails currentUser,
									@RequestBody CartItemDto cartItemDto) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		CartItem cartItem = cartItemMapper.toNewCartItem(cartItemDto, user.getCart());
    	return cartItemMapper.toCartItemDto(cartItemService.saveCartItem(cartItem));
    }

	@PutMapping
	public CartItemDto updateCartItem(@AuthenticationPrincipal CustomUserDetails currentUser,
									@RequestBody CartItemDto cartItemDto) {
//		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		CartItem cartItem = cartItemMapper.toUpdateQuantityCartItem(cartItemDto);
    	return cartItemMapper.toCartItemDto(cartItemService.saveCartItem(cartItem));
    }
	
	@DeleteMapping("/{id}")
	public CartItemDto updateCartItem(@AuthenticationPrincipal CustomUserDetails currentUser,
									@PathVariable String id) {
//		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		CartItem cartItem = cartItemService.validateAndGetCartItemById(Long.parseLong(id));
		cartItemService.deleteCartItem(cartItem);
    	return cartItemMapper.toCartItemDto(cartItem);
	}
}
