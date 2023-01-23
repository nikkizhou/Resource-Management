package com.springboot.demo.repository;

import com.springboot.demo.model.Task;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.Arrays;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;
  
@Repository
public class TaskRepo {
  private List<Task> list = new ArrayList<Task>(Arrays.asList(
      new Task("1", "Task 1", "1", createDate("2023-01-28")),
      new Task("2", "Task 2", "2", createDate(
          "2023-02-05")),
      new Task("2", "Task 2", "2", createDate(
          "2023-02-13")),
      new Task("3", "Task 3", "3", createDate(
          "2023-02-23")),
      new Task("4", "Task 4", "4", createDate(
          "2023-03-10")),
      new Task("5", "Task 5", "1", createDate(
          "2023-04-20")),
      new Task("6", "Task 6", "2", createDate(
          "2023-05-02")),
      new Task("7", "Task 7", "3", createDate("2023-05-28"))
  ));


  private Date createDate(String dateStr) {
    return Date.valueOf(dateStr);
  }

  public List<Task> findAll() {
    return list;
  }

  public Task findById(String id) {
    return list
        .stream()
        .filter(t -> t.getId().equals(id))
        .findFirst().get();
  }

  public List<Task> findByEmployeeId(String employeeId) {
    return list.stream().filter(p -> p.getEmployeeID().equals(employeeId)).collect(Collectors.toList());
  }


  public List<Task> findByEmpIdAndPosPeriod(String employeeId, Date start, Date end) {
    return list.stream().filter(t ->
    t.getEmployeeID().equals(employeeId)
        && t.getDate().after(start)
        && t.getDate().before(end)) 
    .collect(Collectors.toList());
    // return list.stream().filter(s -> {
    //   System.out.println("filter: " + s.getDate().after(start));
    //   return s.getEmployeeID().equals(employeeId);
    // })
    // .collect(Collectors.toList());
  }

  public Task save(Task Task) {
    Task newP = new Task();
    newP.setId(Task.getId());
    newP.setName(Task.getName());
    newP.setEmployeeID(Task.getEmployeeID());
    newP.setDate(Task.getDate());
    list.add(newP);
    return newP;
  }

  public void deleteById(String id) {
    list.removeIf(p -> p.getId().equals(id));
  }

  public void updateById(Task newP, String id) {
    for (int i = 0; i < list.size(); i++) {
      Task p = list.get(i);
      if (p.getId().equals(id)) {
        list.set(i, newP);
      }
    }
  }
}
