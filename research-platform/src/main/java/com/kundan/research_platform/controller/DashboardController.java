package com.kundan.research_platform.controller;

import com.kundan.research_platform.dto.DashboardStatsResponse;
import com.kundan.research_platform.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    DashboardService dashboardService;
    @GetMapping("/stats")
    public DashboardStatsResponse getStats(){
        return dashboardService.getStats();
    }
}