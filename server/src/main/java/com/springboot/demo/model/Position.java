package com.springboot.demo.model;

import java.sql.Date;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
