package com.kundan.research_platform.service;

import com.kundan.research_platform.entity.Paper;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PaperService {


    List<Paper> getAllPapers();

    Paper getPaper(Long id);

    Page<Paper> getPapers(Pageable pageable);

    String deletePaper(Long id);

    String uploadPaper(String title, String abstractText, Integer publicationYear, MultipartFile file) throws IOException;

    ResponseEntity<Resource> downloadPaper(Long id) throws IOException;

    List<Paper> searchByTitle(String title);

    List<Paper> searchByYear(Integer year);

    List<Paper> searchByDepartment(String department);

    String approvePaper(Long id);

    String rejectPaper(Long id);

    List<Paper> searchPaper(String keyword);
}