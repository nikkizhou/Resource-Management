package com.springboot.demo.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.demo.model.Task;
import com.springboot.demo.repository.TaskRepo;

@Service
public class TaskService {

  @Autowired
  private final TaskRepo taskRepo;

  public TaskService(TaskRepo taskRepo) {
    this.taskRepo = taskRepo;
  }

  public List<Task> get() {
    return taskRepo.findAll();
  }

  public Task get(String id) {
    return taskRepo.findById(id);
  }

  public List<Task> getByEmpId(String id) {
    return taskRepo.findByEmployeeId(id);
  }

  public List<Task> getByEmpIdAndPosPeriod(String employeeId, Date start, Date end) {
    return taskRepo.findByEmpIdAndPosPeriod(employeeId, start, end);
  }


  public String remove(String id) {
    taskRepo.deleteById(id);
    return "Tasken med id " + id + " er nå fjernet ! ";
  }

  public Task save(Task Task) {
    return taskRepo.save(Task);
  }

  public String update(Task Task, String id) {
    taskRepo.updateById(Task, id);
    return "Tasken med id " + id + " er nå oppdatert ! ";
  }
}
