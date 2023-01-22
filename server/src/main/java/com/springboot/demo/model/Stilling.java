package com.springboot.demo.model;

import org.springframework.data.annotation.Id;
import jakarta.validation.constraints.NotEmpty;

public class Stilling {
  
  @Id
  private String id;
  @NotEmpty
  private String name;

  private String ansattId;


  public Stilling() {
  }

  public String getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }
  
  public String getAnsattId() {
    return this.ansattId;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setAnsattId(String ansattId) {
    this.ansattId = ansattId;
  }
  

}
