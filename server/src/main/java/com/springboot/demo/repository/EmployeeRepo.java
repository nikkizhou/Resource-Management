package com.springboot.demo.repository;

import com.springboot.demo.exception.AlreadyExistException;
import com.springboot.demo.exception.NotFoundException;
import com.springboot.demo.model.Employee;

import lombok.extern.java.Log;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class EmployeeRepo {
  private List<Employee> list = new ArrayList<Employee>(Arrays.asList(
      new Employee("1", "Emma"),
      new Employee("2", "Ella"),
      new Employee("3", "Filip"),
      new Employee("4", "Jakob"),
      new Employee("5", "Nora")));

  public List<Employee> findAll() {
    return list;
  }

  public Employee findById(String id) throws NotFoundException {
    checkNotFound(id);
    return list.stream().filter(employee -> employee.getId().equals(id)).findFirst().get(); 
  }

  public List<Employee> search(String name) {
    return list.stream().filter(x -> x.getName().startsWith(name)).collect(Collectors.toList());
  }

  public Employee save(Employee employee) throws AlreadyExistException {
    checkAlreadyExist(employee.getId());
    Employee nyEmployee = new Employee();
    nyEmployee.setId(employee.getId());
    nyEmployee.setName(employee.getName());
    list.add(nyEmployee);
    return nyEmployee;
  }

  public void deleteById(String id) throws NotFoundException {
    checkNotFound(id);
    list.removeIf(x -> x.getId().equals(id));
  }

  public void updateById(Employee nyEmployee, String id) throws NotFoundException {
    checkNotFound(id);
    for (int i = 0; i < list.size(); i++) {
      Employee a = list.get(i);
      if (a.getId().equals(id)) {
        list.set(i, nyEmployee);
      }
    }
  }

  public boolean existsById(String id) {
    for (Employee employee : list) {
      if (employee.getId().equals(id)) {
        return true;
      }
    }
    return false;
  }
  
  public void checkAlreadyExist(String id) throws AlreadyExistException {
    if (existsById(id))
      throw new AlreadyExistException("Employee with id " + id + " already exist, the id must be unique");
  }
  
  public void checkNotFound(String id) throws NotFoundException {
    if (!existsById(id))
      throw new NotFoundException("Employee with id " + id + " not found");
  }
}
