package com.springboot.demo.model;

import org.springframework.data.annotation.Id;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class Employee {
  @Id
  @NotNull
  private String id;
  @NotBlank
  private String name;



}
