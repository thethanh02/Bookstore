package com.shopping.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopping.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}