package com.springboot.demo.web;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.springboot.demo.exception.AlreadyExistException;
import com.springboot.demo.exception.HasOverlapExeption;
import com.springboot.demo.exception.NotFoundException;
import com.springboot.demo.model.Position;
import com.springboot.demo.service.PositionService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/positions")
public class PositionController {

  private final PositionService positionService;
  public PositionController(PositionService positionService) {
    this.positionService = positionService;
  }

  @GetMapping
  public Iterable<Position> get() {
    Iterable<Position> positions = positionService.get();
    if (positions == null)
      throw new ResponseStatusException(HttpStatus.NO_CONTENT);
    return positions;
  }

  @GetMapping("{id}")
  public Position get(@PathVariable String id) throws NotFoundException {
    Position position = positionService.get(id);
    if (position == null)
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    return position;
  }

  @GetMapping("/employee/{empId}")
  public Iterable<Position> getByEmpId(@PathVariable String empId) {
    Iterable<Position> positions = positionService.getByEmpId(empId);
    if (positions == null)
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    return positions;
  }
  
  @DeleteMapping("{id}")
  public String delete(@PathVariable String id) throws NotFoundException {
    return positionService.remove(id);
  }

  @PostMapping(consumes={ "application/json" })
  public Position create(@Valid @RequestBody Position position) throws IOException, AlreadyExistException, HasOverlapExeption {
    return positionService.save(position);
  }

  @PutMapping(value = "{id}", consumes = { "application/json" })
  public String update(@Valid @RequestBody Position newP, @PathVariable String id) throws NotFoundException {
    return positionService.update(newP,id);
  }
}
