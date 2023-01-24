package com.springboot.demo.repository;

import com.springboot.demo.exception.AlreadyExistException;
import com.springboot.demo.exception.HasOverlapExeption;
import com.springboot.demo.exception.NotFoundException;
import com.springboot.demo.model.Position;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;
  
@Repository
public class PositionRepo {
  private List<Position> list = new ArrayList<Position>(Arrays.asList(
      new Position("D1", "P1", "1", createDate("2023-01-03"), createDate("2023-01-29")),
      new Position("F2", "P2", "1", createDate("2023-02-03"), createDate("2023-02-05")),
      new Position("D8", "P8", "1", createDate("2023-02-12"), createDate("2023-02-16")),
      new Position("D3", "P3", "2", createDate("2023-02-21"), createDate("2023-02-28")),
      new Position("F4", "P4", "2", createDate("2023-03-11"), createDate("2023-03-15")),
      new Position("B5", "P5", "3", createDate("2023-03-16"), createDate("2023-03-21")),
      new Position("B6", "P6", "5", createDate("2023-03-25"), createDate("2023-03-29")),
      new Position("D7", "P7", "5", createDate("2023-04-12"), createDate("2023-04-19")),
      new Position("F9", "P9", "6", createDate("2023-04-21"), createDate("2023-04-25")),
      new Position("B10", "P10", "7", createDate("2023-04-29"), createDate("2023-05-03")),
      new Position("F11", "P11", "8", createDate("2023-05-12"), createDate("2023-05-19"))
  ));


  private Date createDate(String dateStr) {
    return Date.valueOf(dateStr);
  }

  public List<Position> findAll() {
    return list;
  }

  public Position findById(String id) throws NotFoundException {
    checkNotFound(id);
    return list
        .stream()
        .filter(position -> position.getId().equals(id))
        .findFirst().get();
  }

  public List<Position> findByEmployeeId(String employeeId) {
    return list.stream().filter(p -> p.getEmployeeID().equals(employeeId)).collect(Collectors.toList());
  }

  
  public void deleteById(String id) throws NotFoundException {
    checkNotFound(id);
    list.removeIf(p -> p.getId().equals(id));
  }

  public void updateById(Position newP, String id) throws NotFoundException {
    checkNotFound(id);
    for (int i = 0; i < list.size(); i++) {
      Position p = list.get(i);
      if (p.getId().equals(id)) {
        list.set(i, newP);
      }
    }
  }


  public Position save(Position position) throws AlreadyExistException, HasOverlapExeption {
    checkAlreadyExist(position.getId());
    checkOverLap(position.getEmployeeID(), position.getStart(), position.getEnd());
    Position newP = new Position();
    newP.setId(position.getId());
    newP.setName(position.getName());
    newP.setEmployeeID(position.getEmployeeID());
    newP.setStart(position.getStart());
    newP.setEnd(position.getEnd());
    list.add(newP);
    return newP;
  }


  public boolean hasOverlap(String employeeId, Date start, Date end) {
    List<Position> posForOneEmp = findByEmployeeId(employeeId);
    for (Position position : posForOneEmp) {
      if (position.getStart().before(end) && start.before(position.getEnd()))
        return true;
    }
    return false;
  }
  
  public void checkOverLap(String employeeId, Date start, Date end) throws HasOverlapExeption {
    if (hasOverlap(employeeId, start, end)) {
      throw new HasOverlapExeption("The chosen period is not available for this employee. Please check period overlap");
    }
  }

  
  public boolean existsById(String id) {
    for (Position position : list) {
      if (position.getId().equals(id)) {
        return true;
      }
    }
    return false;
  }


  public void checkAlreadyExist(String id) throws AlreadyExistException {
    if (existsById(id))
      throw new AlreadyExistException("Position with id " + id + " already exist, the id must be unique");
  }

  public void checkNotFound(String id) throws NotFoundException {
    if (!existsById(id))
      throw new NotFoundException("Position with id " + id + " not found");
  }

  
}
