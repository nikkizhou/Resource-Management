package com.springboot.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.NotEmpty;

// map Photo model to database table

@Table("PHOTOS")
public class Photo {

  @Id
  private Integer id;
  @NotEmpty
  private String fileName;

  @JsonIgnore
  private byte[] data;

  private String contentType;


  public Photo() {
  }

  
  public byte[] getData() {
    return this.data;
  }

  public String getContentType() {
    return this.contentType;
  }

  public void setData(byte[] data) {
    this.data = data;
  }

  public void setContentType(String contentType) {
    this.contentType = contentType;
  }




  public Integer getId() {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getFileName() {
    return this.fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }
  
  
}
