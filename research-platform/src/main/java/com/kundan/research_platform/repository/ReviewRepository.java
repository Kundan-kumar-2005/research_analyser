package com.kundan.research_platform.repository;

import com.kundan.research_platform.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findByPaperId(Long paperId);
}