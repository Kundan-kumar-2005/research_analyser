package com.kundan.research_platform.service;

import com.kundan.research_platform.dto.LoginRequest;
import com.kundan.research_platform.dto.RegisterRequest;
import com.kundan.research_platform.entity.Department;
import com.kundan.research_platform.entity.Role;
import com.kundan.research_platform.entity.User;
import com.kundan.research_platform.repository.DepartmentRepository;
import com.kundan.research_platform.repository.RoleRepository;
import com.kundan.research_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTService jwtService;
    @Override
    public String register(RegisterRequest request){
        if(userRepository.findByUsername(
                request.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }
        if(userRepository.findByEmail(
                request.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }
        Department department=departmentRepository.findById(
                        request.getDepartmentId())
                .orElseThrow(()->new RuntimeException("Department not found"));
        Role role=roleRepository.findByName("RESEARCHER").orElseThrow(()->new RuntimeException("Role not found"));
        User user=new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDepartment(department);
        user.setRole(role);
        userRepository.save(user);
        return "User Registered Successfully";

    }
    @Override
    public String login(LoginRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()
        ));
        User user =
                userRepository.findByUsername(request.getUsername())
                        .orElseThrow(
                                ()->new RuntimeException("User not found")
                        );


        return jwtService.generateToken(
                user.getUsername(),
                user.getRole().getName()
        );
    }
}