package com.shopping.service;

import org.springframework.stereotype.Service;

import com.shopping.model.Order;
import com.shopping.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
	private final OrderRepository orderRepository;

	@Override
	public Order saveOrder(Order order) {
		return orderRepository.save(order);
	}
	
	

}
