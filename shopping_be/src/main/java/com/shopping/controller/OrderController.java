package com.shopping.controller;

import static com.shopping.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.shopping.controller.dto.*;
import com.shopping.mapper.*;
import com.shopping.model.*;
import com.shopping.security.CustomUserDetails;
import com.shopping.service.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrderController {
	private final UserService userService;
	private final CartItemService cartItemService;
	private final OrderMapper orderMapper;
	private final OrderService orderService;
	
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/new")
	public OrderDto addOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
									@Valid @RequestBody OrderRequest createOrderRequest) {
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
	
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/me")
	public List<OrderDto> getOrders(@AuthenticationPrincipal CustomUserDetails currentUser) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		List<OrderDto> result = user.getOrders().stream().map(orderMapper::toOrderDto).toList();
    	return result;
    }
	
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/{id}")
	public OrderDto getOrder(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable String id) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		Order order = orderService.validateAndGetOrderById(id);
		if (user.getRole().equals("USER")) {
			if (!order.getUser().getUsername().equals(user.getUsername())) {
				return null;
			}
		}
    	return orderMapper.toOrderDto(order);
    }
	
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@PutMapping
	public OrderDto setOrderStatus(@AuthenticationPrincipal CustomUserDetails currentUser, @RequestBody OrderStatusRequest orderStatusRequest) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		Order order = orderService.validateAndGetOrderById(orderStatusRequest.getId().toString());
		if (order.getStatus().equals("Đang xác nhận") && orderStatusRequest.getStatus().equals("Đã hủy đơn")) {
			if (user.getRole().equals("USER")) {
				if (!order.getUser().getUsername().equals(user.getUsername())) {
					return null; // 401
				}
			}
			order.setCanceledAt(ZonedDateTime.now());
		} else if (order.getStatus().equals("Đang xác nhận") && orderStatusRequest.getStatus().equals("Đang giao hàng")) {
			if (user.getRole().equals("USER")) {
				return null; // 401
			}
			order.setConfirmedAt(ZonedDateTime.now());
		} else if (order.getStatus().equals("Đang giao hàng") && orderStatusRequest.getStatus().equals("Đã giao hàng")) {
			if (user.getRole().equals("USER")) {
				return null; // 401
			}
			order.setDeliveredAt(ZonedDateTime.now());
		} else {
			return null; // bad request
		}
		order.setStatus(orderStatusRequest.getStatus());
		orderService.saveOrder(order);
    	return orderMapper.toOrderDto(order);
    }
	
	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@GetMapping("/all")
	public List<OrderDto> getAllOrders() {
		List<OrderDto> result = orderService.getAllOrders().stream().map(orderMapper::toOrderDto).toList();
    	return result;
    }
	
}
 