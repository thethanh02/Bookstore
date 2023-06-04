package com.shopping.mapper;

import com.shopping.controller.payload.OrderDto;
import com.shopping.controller.payload.OrderRequest;
import com.shopping.model.Order;

public interface OrderMapper {

	Order toOrder(OrderRequest orderRequest);
	
	OrderDto toOrderDto(Order order);
	
}
