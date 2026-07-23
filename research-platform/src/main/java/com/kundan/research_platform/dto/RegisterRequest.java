package com.kundan.research_platform.dto;

public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private Long departmentId;

    public RegisterRequest(){}
    public RegisterRequest(String username,String email,String password,Long departmentId){
        this.username=username;
        this.email=email;
        this.password=password;
        this.departmentId=departmentId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}