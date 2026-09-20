package com.kundan.research_platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ResearchPlatformApplication {

    public static void main(String[] args) {

        SpringApplication.run(ResearchPlatformApplication.class, args);
        BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        System.out.println(passwordEncoder.encode("admin@123"));
    }


}
