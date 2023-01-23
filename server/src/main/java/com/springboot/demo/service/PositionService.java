package com.springboot.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.demo.model.Position;
import com.springboot.demo.repository.PositionRepo;

@Service
public class PositionService {

  @Autowired
  private final PositionRepo positionRepo;

  public PositionService(PositionRepo positionRepo) {
    this.positionRepo = positionRepo;
  }

  public List<Position> get() {
    return positionRepo.findAll();
  }

  public Position get(String id) {
    return positionRepo.findById(id);
  }

  public List<Position> getByEmpId(String id) {
    return positionRepo.findByEmployeeId(id);
  }


  public String remove(String id) {
    positionRepo.deleteById(id);
    return "positionen med id " + id + " er nå fjernet ! ";
  }

  public Position save(Position position) {
    return positionRepo.save(position);
  }

  public String update(Position position, String id) {
    positionRepo.updateById(position, id);
    return "positionen med id " + id + " er nå oppdatert ! ";
  }
}
