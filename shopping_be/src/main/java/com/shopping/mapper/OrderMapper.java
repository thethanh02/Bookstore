package com.shopping.mapper;

import com.shopping.model.Order;
import com.shopping.controller.payload.CreateOrderRequest;
import com.shopping.controller.payload.OrderDto;

public interface OrderMapper {

    Order toOrder(CreateOrderRequest createOrderRequest);

    OrderDto toOrderDto(Order order);
}