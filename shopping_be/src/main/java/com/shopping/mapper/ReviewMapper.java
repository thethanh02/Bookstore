package com.shopping.mapper;

import com.shopping.controller.dto.*;
import com.shopping.model.Review;

public interface ReviewMapper {

    Review toReview(CreateReviewRequest createReviewRequest);

    ReviewDto toReviewDto(Review review);
}