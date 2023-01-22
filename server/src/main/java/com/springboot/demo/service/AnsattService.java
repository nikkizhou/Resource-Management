package com.springboot.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.demo.model.Ansatt;
import com.springboot.demo.repository.AnsattRepo;

@Service
public class AnsattService {

  @Autowired
  private final AnsattRepo ansattRepo;

  public AnsattService(AnsattRepo ansattRepo) {
    this.ansattRepo = ansattRepo;
  }

  public Iterable<Ansatt> get() {
    return ansattRepo.findAll();
  }

  public Ansatt get(String id) {
    return ansattRepo.findById(id);
  }

  public String remove(String id) {
    ansattRepo.deleteById(id);
    return "Ansatten med id "+ id +" er nå fjernet ! ";
  }

  public Ansatt save(Ansatt ansatt) {
    return ansattRepo.save(ansatt);
  }

  public String update(Ansatt ansatt, String id) {
    ansattRepo.updateById(ansatt, id);
    return "Ansatten med id " + id + " er nå oppdatert ! ";
  }
}
