package com.shopping.mapper;

import org.springframework.stereotype.Service;

import com.shopping.controller.payload.*;
import com.shopping.model.Comment;

@Service
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment toComment(CreateCommentRequest createCommentRequest) {
        if (createCommentRequest == null) {
            return null;
        }
        return new Comment(createCommentRequest.getCommentString());
    }

    @Override
    public CommentDto toCommentDto(Comment comment) {
        if (comment == null) {
            return null;
        }
        CommentDto.UserDto userDto = new CommentDto.UserDto(comment.getUser().getUsername());
        return new CommentDto(comment.getId(), comment.getCommentString(), userDto, comment.getCreatedAt());
    }
}
