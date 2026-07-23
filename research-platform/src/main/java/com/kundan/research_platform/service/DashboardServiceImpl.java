package com.kundan.research_platform.service;

import com.kundan.research_platform.dto.DashboardStatsResponse;
import com.kundan.research_platform.dto.PaperRequest;
import com.kundan.research_platform.entity.Paper;
import com.kundan.research_platform.entity.PaperStatus;
import com.kundan.research_platform.repository.PaperRepository;
import com.kundan.research_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService{
    @Autowired
    private PaperRepository paperRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public DashboardStatsResponse getStats() {
        DashboardStatsResponse response=new DashboardStatsResponse();
        response.setApprovedPapers(paperRepository.countByPaperStatus(PaperStatus.APPROVED));
        response.setRejectedPapers(paperRepository.countByPaperStatus(PaperStatus.REJECTED));
        response.setUnderReviewPapers(paperRepository.countByPaperStatus(PaperStatus.UNDER_REVIEW));
        response.setTotalPapers(paperRepository.count());
        response.setTotalResearchers(userRepository.countByRole_Name("RESEARCHER"));
        return response;
    }
}