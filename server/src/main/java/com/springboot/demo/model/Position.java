package com.springboot.demo.model;

import java.sql.Date;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class Position {
  
  @Id
  private String id;
  @NotBlank
  private String name;
  @NotBlank
  private String employeeID;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @NotNull
  private Date start;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @NotNull
  private Date end;
  
  public Position() {
  }

  public Position(String id, String name, String empID, Date start, Date end) {
    this.id = id;
    this.name = name;
    this.employeeID = empID;
    this.start = start;
    this.end = end;
  }


  public Date getStart() {
    return this.start;
  }

  public void setStart(Date start) {
    this.start = start;
  }

  public Date getEnd() {
    return this.end;
  }

  public void setEnd(Date end) {
    this.end = end;
  }

  public String getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }
  
  public String getEmployeeID() {
    return this.employeeID;
  }

  public void setId(String id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setEmployeeID(String empId) {
    this.employeeID = empId;
  }
}
