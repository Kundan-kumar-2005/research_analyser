package com.kundan.research_platform.dto;

public class DashboardStatsResponse {
    private long totalPapers;
    private long approvedPapers;
    private long rejectedPapers;
    private long underReviewPapers;
    private long totalResearchers;
    public DashboardStatsResponse(){}

    public long getTotalPapers() {
        return totalPapers;
    }

    public void setTotalPapers(long totalPapers) {
        this.totalPapers = totalPapers;
    }

    public long getApprovedPapers() {
        return approvedPapers;
    }

    public void setApprovedPapers(long approvedPapers) {
        this.approvedPapers = approvedPapers;
    }

    public long getRejectedPapers() {
        return rejectedPapers;
    }

    public void setRejectedPapers(long rejectedPapers) {
        this.rejectedPapers = rejectedPapers;
    }

    public long getUnderReviewPapers() {
        return underReviewPapers;
    }

    public void setUnderReviewPapers(long underReviewPapers) {
        this.underReviewPapers = underReviewPapers;
    }

    public long getTotalResearchers() {
        return totalResearchers;
    }

    public void setTotalResearchers(long totalResearchers) {
        this.totalResearchers = totalResearchers;
    }
}