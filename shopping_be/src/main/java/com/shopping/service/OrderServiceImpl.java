package com.shopping.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.shopping.exception.EntityNotFoundException;
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
	
	@Override
	public Optional<Order> getOrderById(String id) {
		return orderRepository.findById(Long.valueOf(id));
	}
	
	@Override
	public Order validateAndGetOrderById(String id) {
		return getOrderById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Order with id %s not found", id)));
	}

}
