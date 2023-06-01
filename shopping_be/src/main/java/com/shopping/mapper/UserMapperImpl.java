package com.shopping.mapper;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shopping.model.Review;
import com.shopping.model.User;
import com.shopping.controller.payload.UserDto;

@Service
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        List<UserDto.CommentDto> comments = user.getComments().stream().map(this::toUserDtoCommentDto).toList();
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole(), comments);
    }
    
    private UserDto.CommentDto toUserDtoCommentDto(Review comment) {
        if (comment == null) {
            return null;
        }
        return new UserDto.CommentDto(comment.getId(), comment.getCommentString(), comment.getCreatedAt());
    }
    
}