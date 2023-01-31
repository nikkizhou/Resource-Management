package com.springboot.demo.repository;

import com.springboot.demo.exception.AlreadyExistException;
import com.springboot.demo.exception.DateOutOfRangeException;
import com.springboot.demo.exception.HasOverlapExeption;
import com.springboot.demo.exception.NotFoundException;
import com.springboot.demo.model.Employee;
import com.springboot.demo.model.Position;
import com.springboot.demo.model.Task;

import java.sql.Date;
import java.util.List;

public class Validator {
  String id;
  List list;
  String category;


  public Validator(List list, String category) {
    this.list = list;
    this.category = category;
  }

  public void setId(String id){
    this.id = id;
  }


  public boolean existsById() {
    for (Object item : list) {
      String itemId = "-1";
      switch (category) {
        case "Employee":
          itemId = ((Employee) item).getId();
          break;
        case "Position":
          itemId = ((Position) item).getId();
          break;
        case "Task":
          itemId = ((Task) item).getId();
          break;
        default:
          break;
      }
      if (itemId.equals(id)) {
        return true;
      }
    }
    return false;
  }

  public boolean dateOutOfRange(String employId, Date chosenDate, List<Position> posForOneEmp) {
    for (Position p : posForOneEmp) {
      if (chosenDate.after(p.getStart()) && chosenDate.before(p.getEnd()))
        return false;
    }
    return true;
  }
  
  public void checkAlreadyExist() throws AlreadyExistException {
    if (existsById())
      throw new AlreadyExistException(category+" with id " + id + " already exist, the id must be unique");
  }
  
  public void checkNotFound() throws NotFoundException {
    if (!existsById())
      throw new NotFoundException(category + " with id " + id + " not found");
  }


  // -------------------------- for tasks ----------------------------
  // ---------------------------------------------------------------------
  public void checkDateOutOfRange(String employId, Date chosenDate,
      List<Position> posForOneEmp) throws DateOutOfRangeException {
    if (dateOutOfRange(employId, chosenDate, posForOneEmp))
      throw new DateOutOfRangeException("The employee has no position for this date");
  }

  // -------------------------- for positions ----------------------------
  // ---------------------------------------------------------------------
  public boolean hasOverlap(String employeeId, Date start, Date end, List<Position> posForOneEmp) {
    for (Position position : posForOneEmp) {
      if (position.getStart().before(end) && start.before(position.getEnd()))
        return true;
    }
    return false;
  }

  public void checkOverLap(String employeeId, Date start, Date end,
      List<Position> posForOneEmp) throws HasOverlapExeption {
    if (hasOverlap(employeeId, start, end, posForOneEmp)) {
      throw new HasOverlapExeption("The chosen period is not available for this employee. Please check period overlap");
    }
  }
}

  
