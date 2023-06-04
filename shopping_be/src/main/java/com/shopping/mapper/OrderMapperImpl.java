package com.shopping.mapper;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shopping.controller.payload.OrderDto;
import com.shopping.controller.payload.OrderRequest;
import com.shopping.model.Order;
import com.shopping.model.OrderItem;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderMapperImpl implements OrderMapper {
	private final BookMapper bookMapper;

	@Override
	public Order toOrder(OrderRequest orderRequest) {
		if (orderRequest == null)
			return null;
		return new Order(orderRequest.getName(), orderRequest.getPhoneNum(), orderRequest.getAddress(), orderRequest.getPaymentMethod());
	}

	@Override
	public OrderDto toOrderDto(Order order) {
		if (order == null)
			return null;
		List<OrderDto.OrderItemDto> orderItems = order.getOrderItems().stream().map(this::toOrderDtoOrderItemDto).toList();
		return new OrderDto(order.getId(), order.getName(), order.getPhoneNum(), order.getAddress(), order.getPaymentMethod(), orderItems);
	}
	
	private OrderDto.OrderItemDto toOrderDtoOrderItemDto(OrderItem orderItem) {
		if (orderItem == null)
			return null;
		return new OrderDto.OrderItemDto(orderItem.getId(), orderItem.getQuantity(), bookMapper.toBookDto(orderItem.getBook()));
	}
}
