package com.kundan.research_platform.controller;

import com.kundan.research_platform.dto.PaperRequest;
import com.kundan.research_platform.entity.Paper;
import com.kundan.research_platform.repository.PaperRepository;
import com.kundan.research_platform.service.EmailService;
import com.kundan.research_platform.service.PaperService;
import com.kundan.research_platform.service.PaperServiceImpl;

import org.apache.tomcat.util.MultiThrowable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.hibernate.query.sql.internal.ParameterParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/papers")
public class PaperController {
    @Autowired
    private PaperService paperService;
    @Autowired
    private EmailService emailService;
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadPaper(@RequestParam String title, @RequestParam String abstractText, @RequestParam Integer publicationYear, @RequestParam MultipartFile file) throws IOException {
        return paperService.uploadPaper(title,abstractText,publicationYear,file);
    }
    @GetMapping
    public List<Paper> getAllPapers(){
        return paperService.getAllPapers();
    }
    @GetMapping("/test-mail")
    public String testEmail(){
        emailService.sendEmail("motog342005@gmail.com","Test Email","Spring Boot email is working");
        return "Email sent succesfully";
    }
    @GetMapping("/{id}")
    public Paper getPaper(@PathVariable Long id){
        return paperService.getPaper(id);
    }
    @DeleteMapping("/{id}")
    public String deletePaper(@PathVariable Long id){
        return paperService.deletePaper(id);
    }
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadPaper(@PathVariable Long id)throws IOException{
        return paperService.downloadPaper(id);
    }
    @GetMapping("/page")
    public Page<Paper> getPapers(Pageable pageable){
        return paperService.getPapers(pageable);
    }
    @GetMapping("/search/title")
    public List<Paper> searchByTitle(@RequestParam String title){
        return paperService.searchByTitle(title);
    }
    @GetMapping("/search/year")
    public List<Paper> searchByYear(@RequestParam Integer year){
        return paperService.searchByYear(year);
    }
    @GetMapping("/search/department")
    public List<Paper> searchByDepartment(@RequestParam String department){
        return paperService.searchByDepartment(department);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/approve")
    public String approvePaper(@PathVariable Long id){
        return paperService.approvePaper(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/reject")
    public String rejectPaper(@PathVariable Long id){
        return paperService.rejectPaper(id);
    }
    @GetMapping("/search")
    public List<Paper> searchPaper(@RequestParam String keyword){
        return paperService.searchPaper(keyword);
    }
}