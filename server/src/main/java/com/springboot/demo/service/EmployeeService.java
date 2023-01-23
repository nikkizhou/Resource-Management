package com.springboot.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.demo.exception.AlreadyExistException;
import com.springboot.demo.exception.NotFoundException;
import com.springboot.demo.model.Employee;
import com.springboot.demo.repository.EmployeeRepo;

@Service
public class EmployeeService {

  @Autowired
  private final EmployeeRepo employeeRepo;

  public EmployeeService(EmployeeRepo employeeRepo) {
    this.employeeRepo = employeeRepo;
  }

  public Iterable<Employee> get() {
    return employeeRepo.findAll();
  }

  public Employee get(String id) throws NotFoundException {
    return  employeeRepo.findById(id);
  }

  public String remove(String id) throws NotFoundException {
    employeeRepo.deleteById(id);
    return "Ansatten med id "+ id +" er nå fjernet ! ";
  }

  public Employee save(Employee employee) throws AlreadyExistException {
    return employeeRepo.save(employee);
  }

  public String update(Employee employee, String id) throws NotFoundException {
    employeeRepo.updateById(employee, id);
    return "Ansatten med id " + id + " er nå oppdatert ! ";
  }
}
