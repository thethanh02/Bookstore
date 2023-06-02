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
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole(), toUserDtoCartDto(user.getCart()));
    }
    
    private UserDto.CartDto toUserDtoCartDto(Cart cart) {
        if (cart == null) {
            return null;
        }
        List<CartItemDto> cartItems = cart.getCartItems().stream().map(this::toUserDtoCartDtoCartItemDto).toList();
        return new UserDto.CartDto(cart.getId(), cartItems);
    }
    
    private CartItemDto toUserDtoCartDtoCartItemDto(CartItem cartItem) {
        if (cartItem == null) {
            return null;
        }

        return new CartItemDto(cartItem.getId(), cartItem.getQuantity(), bookMapper.toBookDto(cartItem.getBook()));
    }
    
}