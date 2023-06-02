package com.shopping.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.shopping.model.Review;
import com.shopping.repository.ReviewRepository;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {
	
	private final ReviewRepository reviewRepository;

    @Override
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Review review) {
    	reviewRepository.delete(review);
    }
    
}
