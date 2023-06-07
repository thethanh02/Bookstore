package com.shopping.controller;

import java.util.ArrayList;
import java.util.List;

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

	@PostMapping
	public List<CartItemDto> addCartItem(@AuthenticationPrincipal CustomUserDetails currentUser,
									@RequestBody CartItemDto cartItemDto) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		CartItem cartItem = cartItemService.validateAndGetCartItemByBookId(user.getCartItems(), cartItemDto.book().id());
		
		if (cartItem == null) {
			cartItem = cartItemMapper.toNewCartItem(cartItemDto, user);
			CartItem cartItem2 = cartItemService.saveCartItem(cartItem);
			List<CartItemDto> newCartItemDtos = new ArrayList<>();
			for (CartItem item : user.getCartItems()) {
				newCartItemDtos.add(cartItemMapper.toCartItemDto(item));
			}
			newCartItemDtos.add(cartItemMapper.toCartItemDto(cartItem2));
			return newCartItemDtos;
		} else {
			cartItem.setQuantity(cartItem.getQuantity() + cartItemDto.quantity());
			cartItemService.saveCartItem(cartItem);
			List<CartItemDto> newCartItemDtos = new ArrayList<>();
			for (CartItem item : user.getCartItems()) {
				newCartItemDtos.add(cartItemMapper.toCartItemDto(item));
			}
			return newCartItemDtos;
		}
    }
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/newlist")
	public List<CartItemDto> addListCartItem(@AuthenticationPrincipal CustomUserDetails currentUser,
									@RequestBody List<CartItemDto> cartItemDtos) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		List<CartItemDto> newCartItemDtos = new ArrayList<>();
		for (CartItemDto cartItemDto : cartItemDtos) {
			CartItem cartItem = cartItemMapper.toNewCartItem(cartItemDto, user);
			newCartItemDtos.add(cartItemMapper.toCartItemDto(cartItemService.saveCartItem(cartItem)));
		}
		return newCartItemDtos;
    }
	
	@DeleteMapping("/{id}")
	public CartItemDto deleteCartItem(@AuthenticationPrincipal CustomUserDetails currentUser,
									@PathVariable String id) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		CartItem cartItem = cartItemService.validateAndGetCartItemById(Long.parseLong(id));
		if (cartItem.getUser().getId() != user.getId()) {
			return null;
		}
		cartItemService.deleteCartItem(cartItem);
    	return cartItemMapper.toCartItemDto(cartItem);
	}
	
	@DeleteMapping("/all")
	public void deleteAllCartItem(@AuthenticationPrincipal CustomUserDetails currentUser) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		cartItemService.deleteAllCartItemsByUser(user);
	}
}
