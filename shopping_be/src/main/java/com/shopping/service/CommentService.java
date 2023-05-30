package com.shopping.service;

import java.util.List;

import com.shopping.model.Comment;

public interface CommentService {
	
	List<Comment> getComments();

    Comment validateAndGetComment(String id);

    Comment saveComment(Comment comment);

    void deleteComment(Comment comment);
    
}
