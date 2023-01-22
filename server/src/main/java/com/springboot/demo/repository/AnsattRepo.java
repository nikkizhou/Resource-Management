package com.springboot.demo.repository;

import com.springboot.demo.model.Ansatt;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class AnsattRepo {
  private List<Ansatt> list = new ArrayList<Ansatt>(Arrays.asList(
      new Ansatt("1", "Emma"),
      new Ansatt("2", "Ella"),
      new Ansatt("3", "Filip"),
      new Ansatt("4", "Jakob"),
      new Ansatt("5", "Nora")
  ));

  public List<Ansatt> findAll() {
    return list;
  }

  public Ansatt findById(String id) {
    return list.stream().filter(ansatt -> ansatt.getId().equals(id)).findFirst().get();
  }

  public List<Ansatt> search(String name) {
    return list.stream().filter(x -> x.getName().startsWith(name)).collect(Collectors.toList());
  }

  public Ansatt save(Ansatt ansatt) {
    Ansatt nyAnsatt = new Ansatt();
    nyAnsatt.setId(ansatt.getId());
    nyAnsatt.setName(ansatt.getName());
    list.add(nyAnsatt);
    return nyAnsatt;
  }

  public void deleteById(String id) {
    list.removeIf(x -> x.getId().equals(id));
  }

  public void updateById(Ansatt nyAnsatt, String id) {
    for (int i = 0; i < list.size(); i++) {
      Ansatt a = list.get(i);
      if (a.getId().equals(id)) {
        list.set(i, nyAnsatt);
      }
    }
  }
}
