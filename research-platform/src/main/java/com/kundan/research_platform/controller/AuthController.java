package com.kundan.research_platform.controller;

import com.kundan.research_platform.dto.LoginRequest;
import com.kundan.research_platform.dto.RegisterRequest;
import com.kundan.research_platform.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    public String reqister(@RequestBody RegisterRequest request){
        return authService.register(request);
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        return authService.login(request);
    }
}