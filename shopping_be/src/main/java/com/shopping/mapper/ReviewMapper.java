package com.shopping.mapper;

import com.shopping.controller.payload.*;
import com.shopping.model.Review;

public interface ReviewMapper {

    Review toReview(CreateReviewRequest createReviewRequest);

    ReviewDto toReviewDto(Review review);
}