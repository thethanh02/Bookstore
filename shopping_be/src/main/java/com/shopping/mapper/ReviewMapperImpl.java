package com.shopping.mapper;

import org.springframework.stereotype.Service;

import com.shopping.controller.dto.*;
import com.shopping.model.Review;

@Service
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public Review toReview(CreateReviewRequest createReviewRequest) {
        if (createReviewRequest == null) {
            return null;
        }
        return new Review(createReviewRequest.getCommentString(), createReviewRequest.getRating());
    }

    @Override
    public ReviewDto toReviewDto(Review review) {
        if (review == null) {
            return null;
        }
        ReviewDto.UserDto userDto = new ReviewDto.UserDto(review.getUser().getUsername(), review.getUser().getName());
        return new ReviewDto(review.getId(), review.getCommentString(), review.getRating(), userDto, review.getCreatedAt());
    }
}
