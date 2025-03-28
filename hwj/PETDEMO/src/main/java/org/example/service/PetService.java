package org.example.service;

import org.example.pojo.Pet;

import java.util.List;

public interface PetService {
    List<Pet> selectAllPet();
}
