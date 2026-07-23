package com.kundan.research_platform.service;

import com.kundan.research_platform.entity.Paper;
import com.kundan.research_platform.entity.PaperStatus;
import com.kundan.research_platform.entity.User;
import com.kundan.research_platform.repository.DepartmentRepository;
import com.kundan.research_platform.repository.PaperRepository;
import com.kundan.research_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaperServiceImpl implements PaperService{
    @Autowired
    private PaperRepository paperRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private EmailService emailService;
    @Override
    public List<Paper> getAllPapers() {
        return paperRepository.findAll();
    }

    @Override
    public Paper getPaper(Long id) {
        return paperRepository.findById(id).orElseThrow(()->new RuntimeException("Paper not found"));
    }

    @Override
    public Page<Paper> getPapers(Pageable pageable) {
        return paperRepository.findAll(pageable);
    }

    @Override
    public String deletePaper(Long id) {
        Paper paper=paperRepository.findById(id).orElseThrow(()->new RuntimeException("Paper not found"));
        paperRepository.delete(paper);
        return "Paper deletedSuccessfully";
    }

    @Override
    public String uploadPaper(String title, String abstractText, Integer publicationYear, MultipartFile file) throws IOException {
        String username= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));
        String fileName=System.currentTimeMillis()+"-"+file.getOriginalFilename();
        Path uploadPath= Paths.get("uploads");
        Files.createDirectories(uploadPath);
        Files.copy(file.getInputStream(),uploadPath.resolve(fileName));

        Paper paper = new Paper();

        paper.setTitle(title);
        paper.setAbstractText(abstractText);
        paper.setPublicationYear(publicationYear);
        paper.setUploadedAt(LocalDateTime.now());
        paper.setUploadedBy(user);
        paper.setDepartment(user.getDepartment());

        paper.setFilePath(
                uploadPath.resolve(fileName)
                        .toString()
        );

        paper.setOriginalFileName(
                file.getOriginalFilename()
        );
        paperRepository.save(paper);

        return "Paper uploaded successfully";
    }

    @Override
    public ResponseEntity<Resource> downloadPaper(Long id) throws IOException{
        Paper paper =paperRepository.findById(id).orElseThrow(()-> new RuntimeException("Paper not found"));
        Path filePath=Paths.get(paper.getFilePath());
        Resource resource=new UrlResource(filePath.toUri());
        if(!resource.exists()){
            throw new RuntimeException("File not found");
        }
        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\""
                                + paper.getOriginalFileName()
                                + "\""
                )
                .body(resource);
    }

    @Override
    public List<Paper> searchByTitle(String title) {
        return paperRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Paper> searchByYear(Integer year) {
        return paperRepository.findByPublicationYear(year);
    }

    @Override
    public List<Paper> searchByDepartment(String department) {
        return paperRepository.findByDepartment_Name(department);
    }

    @Override
    public String approvePaper(Long id) {
        Paper paper=paperRepository.findById(id).orElseThrow(()-> new RuntimeException("Paper not found"));
        paper.setPaperStatus(PaperStatus.APPROVED);
        paperRepository.save(paper);
        emailService.sendEmail(paper.getUploadedBy().getEmail(),
                "Paper Approved ",
                "Your paper \""+paper.getTitle()+"\"has been approved by the administrator."
        );
        return "Paper approved successfully";
    }

    @Override
    public String rejectPaper(Long id) {
        Paper paper=paperRepository.findById(id).orElseThrow(()-> new RuntimeException("Paper not found"));
        paper.setPaperStatus(PaperStatus.REJECTED);
        paperRepository.save(paper);
        emailService.sendEmail(paper.getUploadedBy().getEmail(),
                "Paper Rejected ",
                "Your paper \""+paper.getTitle()+"\"has been rejected by the administrator."
        );
        return "Paper rejected successfully";
    }

    @Override
    public List<Paper> searchPaper(String keyword) {
        return paperRepository.searchPapers(keyword);
    }


}