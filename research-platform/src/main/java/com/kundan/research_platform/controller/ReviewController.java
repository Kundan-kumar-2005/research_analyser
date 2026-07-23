package com.kundan.research_platform.controller;

import com.kundan.research_platform.dto.ReviewRequest;
import com.kundan.research_platform.entity.Review;
import com.kundan.research_platform.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @PreAuthorize("hasRole('RESEARCHER')")
    @PostMapping("/{paperId}")
    public String addReview(@PathVariable Long paperId, @RequestBody ReviewRequest request){
        return reviewService.addReview(paperId,request);
    }
    @PreAuthorize("hasRole('RESEARCHER')")
    @GetMapping("/{paperId}")
    public List<Review> getReviews(@PathVariable Long paperId){
        return reviewService.getReviewsByPaper(paperId);
    }
    @GetMapping("/paper/{paperId}")
    public ResponseEntity<?> getReviewsByPaper(@PathVariable Long paperId){
        return ResponseEntity.ok(reviewService.getReviewsByPaper(paperId));
    }

}