package com.springboot.demo.model;

import org.springframework.data.annotation.Id;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@NoArgsConstructor
@AllArgsConstructor
@Data
public class Employee {
  
  @Id
  @NotNull
  private String id;
  @NotBlank
  private String name;

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
