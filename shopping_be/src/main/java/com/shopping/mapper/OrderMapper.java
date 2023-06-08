package com.shopping.mapper;

import com.shopping.controller.dto.OrderDto;
import com.shopping.controller.dto.OrderRequest;
import com.shopping.model.Order;

public interface OrderMapper {

	Order toOrder(OrderRequest orderRequest);
	
	OrderDto toOrderDto(Order order);
	
}
