package com.shopping.service;

import java.util.List;

import com.shopping.model.Review;

public interface ReviewService {
	
	List<Review> getReviews();

    Review validateAndGetReview(String id);

    Review saveReview(Review review);

    void deleteReview(Review review);
    
}
