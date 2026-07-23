package com.kundan.research_platform.service;

import com.kundan.research_platform.dto.ReviewRequest;
import com.kundan.research_platform.entity.Paper;
import com.kundan.research_platform.entity.Review;
import com.kundan.research_platform.entity.User;
import com.kundan.research_platform.repository.PaperRepository;
import com.kundan.research_platform.repository.ReviewRepository;
import com.kundan.research_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ReviewServiceImpl implements ReviewService{
    @Autowired
    private PaperRepository paperRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Override
    public String addReview(Long paperId, ReviewRequest request) {
        Paper paper=paperRepository.findById(paperId).orElseThrow(()->new RuntimeException("Paper not found"));
        String username= SecurityContextHolder.getContext().getAuthentication().getName();
        User reviewer=userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));
        Review review=new Review();
        review.setComment(request.getComment());
        review.setRating(request.getRating());
        review.setPaper(paper);
        review.setReviewer(reviewer);
        reviewRepository.save(review);
        return "Review submitted successfully";
    }

    @Override
    public List<Review> getReviewsByPaper(Long paperId) {
        return reviewRepository.findByPaperId(paperId);
    }
}