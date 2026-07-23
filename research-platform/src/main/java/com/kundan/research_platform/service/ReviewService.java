package com.kundan.research_platform.service;

import com.kundan.research_platform.dto.ReviewRequest;
import com.kundan.research_platform.entity.Review;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


public interface ReviewService {
    String addReview(Long paperId, ReviewRequest request);
    List<Review> getReviewsByPaper(Long paperId);
}