package com.kundan.research_platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name="department")

public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String name;
    private String description;

    public Department(){}
    public Department(Long id,String name,String description){
        this.id=id;
        this.name=name;
        this.description=description;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId(){
        return id;
    }
    public void setId(Long id){
        this.id=id;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description=description;
    }
}