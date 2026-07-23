package com.kundan.research_platform.dto;

import com.kundan.research_platform.repository.PaperRepository;

public class PaperRequest {
    private String title;
    //    private String abstractText;
//    private Integer PublicationYear;
    public PaperRequest(){}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

//    public String getAbstractText() {
//        return abstractText;
//    }
//
//    public void setAbstractText(String abstractText) {
//        this.abstractText = abstractText;
//    }
//
//    public Integer getPublicationYear() {
//        return PublicationYear;
//    }
//
//    public void setPublicationYear(Integer publicationYeaer) {
//        PublicationYear = publicationYeaer;
//    }
}