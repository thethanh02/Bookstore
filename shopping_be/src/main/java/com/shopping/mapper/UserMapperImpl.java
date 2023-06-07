package com.shopping.mapper;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shopping.model.*;

import lombok.RequiredArgsConstructor;

import com.shopping.controller.payload.CartItemDto;
import com.shopping.controller.payload.UserDto;

@RequiredArgsConstructor
@Service
public class UserMapperImpl implements UserMapper {
	
	private final BookMapper bookMapper;
	
    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        List<CartItemDto> cartItems = user.getCartItems().stream().map(this::toUserDtoCartItemDto).toList();
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole(), cartItems);
    }
    
    
    private CartItemDto toUserDtoCartItemDto(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }

        return new CartItemDto(cartItem.getId(), cartItem.getQuantity(), bookMapper.toBookDto(cartItem.getBook()));
    }
    
}