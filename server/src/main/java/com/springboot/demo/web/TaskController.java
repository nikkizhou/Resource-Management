package com.springboot.demo.web;

import java.io.IOException;
import java.sql.Date;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.springboot.demo.model.Task;
import com.springboot.demo.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

  private final TaskService taskService;
  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  @GetMapping
  public Iterable<Task> get() {
    Iterable<Task> tasks = taskService.get();
    if (tasks == null)
      throw new ResponseStatusException(HttpStatus.NO_CONTENT);
    return tasks;
  }

  @GetMapping("{id}")
  public Task get(@PathVariable String id) {
    Task task = taskService.get(id);
    if (task == null)
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    return task;
  }

  @GetMapping("/employee")
  public Iterable<Task> getByEmpId(
      @RequestParam("empId") String empId,
      @RequestParam("start") Date start,
      @RequestParam("end") Date end) {
    System.out.println(empId + " empId");
    System.out.println(start + " star!!");
    // Date startDate = Date.valueOf(start);
    // Date endDate = Date.valueOf(end);
    Iterable<Task> tasks = taskService.getByEmpIdAndPosPeriod(empId, start, end);
    if (tasks == null)
      throw new ResponseStatusException(HttpStatus.NO_CONTENT);
    return tasks;
  }

  // @GetMapping("/employee/{empId}")
  // public Iterable<Task> getByEmpIdAndPosPeriod(@PathVariable String empId) {
  //   Iterable<Task> Tasks = taskService.getByEmpIdAndPosPeriod(empId, 2,2);
  //   if (Tasks == null)
  //     throw new ResponseStatusException(HttpStatus.NOT_FOUND);
  //   return Tasks;
  // }
  
  @DeleteMapping("{id}")
  public String delete(@PathVariable String id) {
    return taskService.remove(id);
  }

  @PostMapping(consumes={ "application/json" })
  public Task create(@RequestBody Task Task) throws IOException {
    return taskService.save(Task);
  }

  @PutMapping(value = "{id}", consumes = { "application/json" })
  public String update(@RequestBody Task newP, @PathVariable String id) {
    return taskService.update(newP,id);
  }
}
