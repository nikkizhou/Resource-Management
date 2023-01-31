package com.springboot.demo.repository;

import com.springboot.demo.exception.AlreadyExistException;
import com.springboot.demo.exception.NotFoundException;
import com.springboot.demo.model.Employee;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class EmployeeRepo {
  private List<Employee> list = new ArrayList<Employee>(Arrays.asList(
      new Employee("1", "Emma J."),
      new Employee("2", "Ella M."),
      new Employee("3", "Filip S."),
      new Employee("4", "Jakob K."),
      new Employee("5", "Nora T."),
      new Employee("6", "Tim L."),
      new Employee("7", "Johannes F."),
      new Employee("8", "Alex D.")));

  private Validator validator = new Validator(list, "Employee");

  public List<Employee> findAll() {
    return list;
  }

  public Employee findById(String id) throws NotFoundException {
    validator.setId(id);
    validator.checkNotFound();
    return list.stream().filter(employee -> employee.getId().equals(id)).findFirst().get();
  }

  public List<Employee> search(String name) {
    return list.stream().filter(x -> x.getName().startsWith(name)).collect(Collectors.toList());
  }

  public Employee save(Employee employee) throws AlreadyExistException {
    validator.setId(employee.getId());
    validator.checkAlreadyExist();
    Employee nyEmployee = new Employee();
    nyEmployee.setId(employee.getId());
    nyEmployee.setName(employee.getName());
    list.add(nyEmployee);
    return nyEmployee;
  }

  public void deleteById(String id) throws NotFoundException {
    validator.setId(id);
    validator.checkNotFound();
    list.removeIf(x -> x.getId().equals(id));
  }

  public void updateById(Employee nyEmployee, String id) throws NotFoundException {
    validator.setId(id);
    validator.checkNotFound();
    for (int i = 0; i < list.size(); i++) {
      Employee a = list.get(i);
      if (a.getId().equals(id)) {
        list.set(i, nyEmployee);
      }
    }
  }
}
