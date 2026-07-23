package com.kundan.research_platform.repository;

import com.kundan.research_platform.entity.Paper;
import com.kundan.research_platform.entity.PaperStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaperRepository extends JpaRepository<Paper,Long> {
    List<Paper> findByTitleContainingIgnoreCase(String title);
    List<Paper> findByPublicationYear(Integer year);
    List<Paper> findByDepartment_Name(String departmentName);
    long countByPaperStatus(PaperStatus status);
    @Query("""
        SELECT p FROM Paper p
        WHERE lower(p.title) LIKE lower(concat('%', :keyword, '%'))
        OR lower(p.abstractText) LIKE lower(concat('%', :keyword, '%'))
        OR lower(p.department.name) LIKE lower(concat('%', :keyword, '%'))
    """)
    List<Paper> searchPapers(String keyword);
}