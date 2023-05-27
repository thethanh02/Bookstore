package com.shopping.mapper;

import org.springframework.stereotype.Service;

import com.shopping.model.User;
import com.shopping.controller.payload.UserDto;

@Service
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole());
    }
    
}