package com.shopping.controller;

import java.time.ZonedDateTime;
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
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/new")
	public OrderDto addOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
									@RequestBody OrderRequest createOrderRequest) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		Order order = orderMapper.toOrder(createOrderRequest);
		order.setStatus("Đang xác nhận");
		order.setUser(user);
		order.setCreatedAt(ZonedDateTime.now());
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
	
	@GetMapping("/{id}")
	public OrderDto getOrder(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable String id) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		Order order = orderService.validateAndGetOrderById(id);
		if (!order.getUser().getUsername().equals(user.getUsername())) {
			return null;
		}
    	return orderMapper.toOrderDto(order);
    }
	
	@PutMapping
	public OrderDto setOrderStatus(@AuthenticationPrincipal CustomUserDetails currentUser, @RequestBody OrderStatusRequest orderStatusRequest) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		Order order = orderService.validateAndGetOrderById(orderStatusRequest.getId().toString());
		if (!order.getUser().getUsername().equals(user.getUsername())) {
			return null;
		}
		if (order.getStatus().equals("Đang xác nhận") && orderStatusRequest.getStatus().equals("Đã hủy đơn")) {
			order.setCanceledAt(ZonedDateTime.now());
			order.setStatus(orderStatusRequest.getStatus());
		} else {
			return null;
		}
		orderService.saveOrder(order);
    	return orderMapper.toOrderDto(order);
    }
	
}
 