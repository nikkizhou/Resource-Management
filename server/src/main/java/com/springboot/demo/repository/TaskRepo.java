package com.springboot.demo.repository;

import com.springboot.demo.exception.AlreadyExistException;
import com.springboot.demo.exception.DateOutOfRangeException;
import com.springboot.demo.exception.NotFoundException;
import com.springboot.demo.model.Position;
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
      new Task("1a", "Task1a", "1", createDate("2023-01-28")),
      new Task("2a", "Task2a", "1", createDate( "2023-01-05")),
      new Task("3e", "Task3e", "1", createDate( "2023-02-13")),
      new Task("3f", "Task33f", "2", createDate( "2023-02-27")),
      new Task("4a", "Task4a", "2", createDate( "2023-03-13")),
      new Task("5s", "Task5s", "3", createDate("2023-03-17")),
      new Task("6e", "Task6e", "3", createDate("2023-03-18")),
      new Task("7f", "Task7f", "3", createDate("2023-03-19")),
      new Task("8s", "Task8s", "5", createDate("2023-03-28")),
      new Task("9e", "Task9e", "5", createDate("2023-03-27")),
      new Task("10s", "Task10s", "6", createDate("2023-04-22")),
      new Task("11f", "Task11f", "6", createDate("2023-04-24")),
      new Task("12e", "Task12e", "7", createDate("2023-05-01"))
  ));

  private final PositionRepo positionRepo;

  public TaskRepo(PositionRepo positionRepo) {
    this.positionRepo = positionRepo;
  }


  private Date createDate(String dateStr) {
    return Date.valueOf(dateStr);
  }

  public List<Task> findAll() {
    return list;
  }

  public Task findById(String id) throws NotFoundException {
    checkNotFound(id);
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
      
    // return list.stream().filter(t -> {
    //   System.out.println("filter: " + t.getDate());
    //   System.out.println(t.getDate().after(start)+"after(start)");
    //   System.out.println(t.getDate().before(end)+"before(end)");
    //   return 
    //     t.getEmployeeID().equals(employeeId)
    //      && t.getDate().after(start)
    //      && t.getDate().before(end);
    // })
    // .collect(Collectors.toList());
  }

  public Task save(Task task) throws AlreadyExistException, DateOutOfRangeException {
    checkAlreadyExist(task.getId());
    checkDateOutOfRange(task.getEmployeeID(),task.getDate());
    Task newP = new Task();
    newP.setId(task.getId());
    newP.setName(task.getName());
    newP.setEmployeeID(task.getEmployeeID());
    newP.setDate(task.getDate());
    list.add(newP);
    return newP;
  }

  public void deleteById(String id) throws NotFoundException {
    checkNotFound(id);
    list.removeIf(p -> p.getId().equals(id));
  }

  public void updateById(Task newP, String id) throws NotFoundException {
    checkNotFound(id);
    for (int i = 0; i < list.size(); i++) {
      Task p = list.get(i);
      if (p.getId().equals(id)) {
        list.set(i, newP);
      }
    }
  }

  public boolean existsById(String id) {
    for (Task task : list) {
      if (task.getId().equals(id)) {
        return true;
      }
    }
    return false;
  }

  public boolean dateOutOfRange(String employId, Date chosenDate) {
    List<Position> positions = positionRepo.findByEmployeeId(employId);
    for (Position p : positions) {
      if (chosenDate.after(p.getStart()) && chosenDate.before(p.getEnd()))
        return false;
    }
    return true;
  }

  public void checkAlreadyExist(String id) throws AlreadyExistException {
    if (existsById(id))
      throw new AlreadyExistException("Task with id " + id + " already exist, the id must be unique");
  }

  public void checkNotFound(String id) throws NotFoundException {
    if (!existsById(id))
      throw new NotFoundException("Task with id " + id + " not found");
  }

  public void checkDateOutOfRange(String employId, Date chosenDate) throws DateOutOfRangeException {
    if (dateOutOfRange(employId, chosenDate)) 
      throw new DateOutOfRangeException("The employee has no position for this date");
      
    
  }
}
