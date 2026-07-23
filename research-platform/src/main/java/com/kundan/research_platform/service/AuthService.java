package com.kundan.research_platform.service;

import com.kundan.research_platform.dto.LoginRequest;
import com.kundan.research_platform.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);
    String login(LoginRequest request);
}