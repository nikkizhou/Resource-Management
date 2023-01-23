package com.springboot.demo.model;

import org.springframework.data.annotation.Id;
import jakarta.validation.constraints.NotEmpty;

public class Employee {
  
  @Id
  private String id;
  @NotEmpty
  private String name;


  public Employee() {
  }

  public Employee(String id, String name) {
    this.id = id;
    this.name = name;
  }

  public String getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

}
