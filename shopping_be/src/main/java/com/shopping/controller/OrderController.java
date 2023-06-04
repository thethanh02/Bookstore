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
@RequestMapping("/api/orders")
public class OrderController {
	private final UserService userService;
	private final CartItemService cartItemService;
	private final OrderMapper orderMapper;
	private final OrderService orderService;
	private final OrderItemService orderItemService;
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/new")
	public OrderDto addOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
									@RequestBody OrderRequest createOrderRequest) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		Order order = orderMapper.toOrder(createOrderRequest);
		order.setUser(user);
//		Order newOrder = orderService.saveOrder(order);
//		for (CartItemDto cartItemDto : createOrderRequest.getCartItems()) {
//			CartItem cartItem = cartItemService.validateAndGetCartItemById(cartItemDto.id());
//			orderItemService.saveOrderItem(new OrderItem(cartItem.getQuantity(), order, cartItem.getBook()));
////			OrderItem orderItem = orderItemService.saveOrderItem(new OrderItem(cartItem.getQuantity(), order, cartItem.getBook()));
//		}
		for (CartItemDto cartItemDto : createOrderRequest.getCartItems()) {
			CartItem cartItem = cartItemService.validateAndGetCartItemById(cartItemDto.id());
			order.addOrderItem(new OrderItem(cartItem.getQuantity(), order, cartItem.getBook()));
		}
    	return orderMapper.toOrderDto(orderService.saveOrder(order));
    }
	
	@GetMapping("/me")
	public List<OrderDto> getOrders(@AuthenticationPrincipal CustomUserDetails currentUser) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		List<OrderDto> result = user.getOrders().stream().map(orderMapper::toOrderDto).toList();
    	return result;
    }
	
}
 