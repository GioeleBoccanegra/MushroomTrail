package com.mushroomtrail.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mushroomtrail.backend.model.Spot;
import com.mushroomtrail.backend.model.User;

@Repository
public interface SpotRepository extends JpaRepository<Spot, Long> {

  Optional<Spot> findByName(String name);

  List<Spot> findByUser(User user);

}
