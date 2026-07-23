package com.kundan.research_platform.dto;

public class ReviewRequest {
    private String comment;
    private Integer rating;
    public ReviewRequest(){}


    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}