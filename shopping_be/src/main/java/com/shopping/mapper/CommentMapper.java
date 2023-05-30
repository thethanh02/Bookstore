package com.shopping.mapper;

import com.shopping.controller.payload.*;
import com.shopping.model.Comment;

public interface CommentMapper {

    Comment toComment(CreateCommentRequest createCommentRequest);

    CommentDto toCommentDto(Comment comment);
}