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
      new Position("B51", "P5", "3", createDate("2023-03-22"), createDate("2023-03-24")),
      new Position("B6", "P6", "5", createDate("2023-03-25"), createDate("2023-03-29")),
      new Position("D7", "P7", "5", createDate("2023-04-12"), createDate("2023-04-19")),
      new Position("F9", "P9", "6", createDate("2023-04-21"), createDate("2023-04-25")),
      new Position("B10", "P10", "7", createDate("2023-04-29"), createDate("2023-05-03")),
      new Position("F11", "P11", "8", createDate("2023-05-12"), createDate("2023-05-19"))
  ));

  private Validator validator = new Validator(list, "Position");


  private Date createDate(String dateStr) {
    return Date.valueOf(dateStr);
  }

  public List<Position> findAll() {
    return list;
  }

  public Position findById(String id) throws NotFoundException {
    validator.setId(id);
    validator.checkNotFound();
    return list
        .stream()
        .filter(position -> position.getId().equals(id))
        .findFirst().get();
  }

  public List<Position> findByEmployeeId(String employeeId) {
    return list.stream().filter(p -> p.getEmployeeID().equals(employeeId)).collect(Collectors.toList());
  }

  
  public void deleteById(String id) throws NotFoundException {
    validator.setId(id);
    validator.checkNotFound();
    list.removeIf(p -> p.getId().equals(id));
  }

  public void updateById(Position newP, String id) throws NotFoundException {
    validator.setId(id);
    validator.checkNotFound();
    for (int i = 0; i < list.size(); i++) {
      Position p = list.get(i);
      if (p.getId().equals(id)) {
        list.set(i, newP);
      }
    }
  }


  public Position save(Position position) throws AlreadyExistException, HasOverlapExeption {
    validator.setId(position.getId());
    validator.checkAlreadyExist();
    List<Position> posForOneEmp = findByEmployeeId(position.getEmployeeID());
    validator.checkOverLap(position.getEmployeeID(), position.getStart(), position.getEnd(), posForOneEmp);

    Position newP = new Position();
    newP.setId(position.getId());
    newP.setName(position.getName());
    newP.setEmployeeID(position.getEmployeeID());
    newP.setStart(position.getStart());
    newP.setEnd(position.getEnd());
    list.add(newP);
    return newP;
  }




  




  
}
