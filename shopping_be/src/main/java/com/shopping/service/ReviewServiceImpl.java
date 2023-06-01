package com.shopping.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.shopping.exception.EntityNotFoundException;
import com.shopping.model.Review;
import com.shopping.repository.ReviewRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {
	
	private final ReviewRepository commentRepository;

    @Override
    public List<Review> getReviews() {
        return commentRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Review validateAndGetReview(String id) {
        return commentRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new EntityNotFoundException(String.format("Comment with id %s not found", id)));
    }

    @Override
    public Review saveReview(Review review) {
        return commentRepository.save(review);
    }

    @Override
    public void deleteReview(Review review) {
    	commentRepository.delete(review);
    }
    
}
