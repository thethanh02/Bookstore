package com.shopping.mapper;

import com.shopping.controller.dto.UserDto;
import com.shopping.model.User;

public interface UserMapper {

    UserDto toUserDto(User user);
}