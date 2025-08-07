package com.mushroomtrail.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mushroomtrail.backend.model.Spot;
import com.mushroomtrail.backend.model.User;
import com.mushroomtrail.backend.repository.SpotRepository;

@Service
public class SpotService {

  private final SpotRepository spotRepository;

  public SpotService(SpotRepository spotRepository) {
    this.spotRepository = spotRepository;
  }

  public Optional<Spot> findByUser(User User) {
    return spotRepository.findByUser(User);
  }

  public Spot saveSpot(Spot spot) {
    if (spot.getUser() == null || spot.getUser().getId() == null) {
      throw new IllegalArgumentException("Id utente mancante");
    }

    Spot spotSalvato = spotRepository.save(spot);
    return spotSalvato;
  }

}
