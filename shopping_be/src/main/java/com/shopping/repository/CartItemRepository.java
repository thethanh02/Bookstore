package com.shopping.repository;


import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import com.shopping.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}