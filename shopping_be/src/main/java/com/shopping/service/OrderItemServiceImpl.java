package com.shopping.service;

import org.springframework.stereotype.Service;

import com.shopping.model.OrderItem;
import com.shopping.repository.OrderItemRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderItemServiceImpl implements OrderItemService {
	private final OrderItemRepository orderItemRepository;

	@Override
	public OrderItem saveOrderItem(OrderItem orderItem) {
		return orderItemRepository.save(orderItem);
	}
	
	
}
