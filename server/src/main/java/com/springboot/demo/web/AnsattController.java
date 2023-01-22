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

import com.springboot.demo.model.Ansatt;
import com.springboot.demo.service.AnsattService;

//1. validate request body/params, f.ks hvis id ikke finnes for update, 
// 2. integrere med database


//RestController enables you to get json objects from each function
@RestController
@RequestMapping("/api/ansatte")
public class AnsattController {

  // if we have @autowired here, then it does the constructor injection automatically for us.
  // @autowired enables you to inject the object dependency implicitly
  private final AnsattService ansattService;
  public AnsattController(AnsattService ansattService) {
    this.ansattService = ansattService;
  }

  @GetMapping
  public Iterable<Ansatt> get() {
    Iterable<Ansatt> ansatte = ansattService.get();
    if (ansatte == null)
      throw new ResponseStatusException(HttpStatus.NO_CONTENT);
    return ansatte;
  }

  @GetMapping("{id}")
  public Ansatt get(@PathVariable String id) {
    Ansatt ansatt = ansattService.get(id);
    if (ansatt == null)
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    return ansatt;
  }
  
  @DeleteMapping("{id}")
  public String delete(@PathVariable String id) {
    return ansattService.remove(id);
  }

  @PostMapping(consumes={ "application/json" })
  public Ansatt create(@RequestBody Ansatt ansatt) throws IOException {
    return ansattService.save(ansatt);
  }

  @PutMapping(value = "{id}", consumes = { "application/json" })
  public String update(@RequestBody Ansatt nyAnsatt, @PathVariable String id) {
    return ansattService.update(nyAnsatt,id);
  }
}
