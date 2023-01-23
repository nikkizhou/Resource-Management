package com.springboot.demo.web;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.springboot.demo.exception.AlreadyExistException;
import com.springboot.demo.exception.NotFoundException;
import com.springboot.demo.model.Employee;
import com.springboot.demo.service.EmployeeService;

import jakarta.validation.Valid;

//1. validate request body/params, f.ks hvis id ikke finnes for update, 
// 2. integrere med database


//RestController enables you to get json objects from each function
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

  // if we have @autowired here, then it does the constructor injection automatically for us.
  // @autowired enables you to inject the object dependency implicitly
  private final EmployeeService ansattService;
  public EmployeeController(EmployeeService ansattService) {
    this.ansattService = ansattService;
  }

  @GetMapping
  public Iterable<Employee> get() {
    Iterable<Employee> ansatte = ansattService.get();
    if (ansatte == null)
      throw new ResponseStatusException(HttpStatus.NO_CONTENT);
    return ansatte;
  }

  @GetMapping("{id}")
  public Employee get(@PathVariable String id) throws NotFoundException {
    //Employee employee = ansattService.get(id);
    // System.out.println(employee+"em!!");
    // if (employee == null) {
    //   System.out.println("testttt!");
    //   throw new NotFoundException("Employee not found with id:" + id);
    // }
      
    Employee employee = Optional.ofNullable(ansattService.get(id))
      .orElseThrow(() -> new NotFoundException("Employee not found with id:" + id));
    return employee;
  }
  
  @DeleteMapping("{id}")
  public String delete(@PathVariable String id) throws NotFoundException {
    return ansattService.remove(id);
  }

  @PostMapping(consumes={ "application/json" })
  public Employee create(@Valid @RequestBody Employee ansatt ) throws IOException, AlreadyExistException {
    return ansattService.save(ansatt);
  }

  @PutMapping(value = "{id}", consumes = { "application/json" })
  public String update(@Valid @RequestBody Employee nyAnsatt, @PathVariable String id) throws NotFoundException {
    return ansattService.update(nyAnsatt,id);
  }
}
