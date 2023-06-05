package com.shopping.service;

import java.util.Optional;

import com.shopping.model.Book;
import com.shopping.model.Order;

public interface OrderService {

	Order saveOrder(Order order);	
	
	Optional<Order> getOrderById(String id);
	
	Order validateAndGetOrderById(String id);
	
}
