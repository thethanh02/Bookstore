package com.shopping.service;

import com.shopping.model.Review;

public interface ReviewService {

    Review saveReview(Review review);

    void deleteReview(Review review);
    
}
