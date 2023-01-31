package com.springboot.demo.model;

import java.sql.Date;
import org.springframework.data.annotation.Id;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

  @Id
  private String id;
  @NotEmpty
  private String name;
  private String employeeID;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @NotNull
  private Date date;

}
