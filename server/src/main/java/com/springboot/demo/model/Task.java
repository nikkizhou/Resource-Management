package com.springboot.demo.model;

import java.sql.Date;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;

public class Task {

  @Id
  private String id;
  @NotEmpty
  private String name;
  private String employeeID;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date date;
 

  public Task() {
  }

  public Task(String id, String name, String empID, Date date) {
    this.id = id;
    this.name = name;
    this.employeeID = empID;
    this.date = date;
  }

  public Date getDate() {
    return this.date;
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

  public void setDate(Date start) {
    this.date = start;
  }

}
