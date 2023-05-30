package com.shopping.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.shopping.exception.EntityNotFoundException;
import com.shopping.model.Comment;
import com.shopping.repository.CommentRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {
	
	private final CommentRepository commentRepository;

    @Override
    public List<Comment> getComments() {
        return commentRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Comment validateAndGetComment(String id) {
        return commentRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new EntityNotFoundException(String.format("Comment with id %s not found", id)));
    }

    @Override
    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Comment comment) {
    	commentRepository.delete(comment);
    }
    
}
