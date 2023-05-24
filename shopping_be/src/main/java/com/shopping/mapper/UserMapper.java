package com.shopping.mapper;

import com.shopping.model.User;
import com.shopping.controller.payload.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);
}