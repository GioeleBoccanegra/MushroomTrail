package com.mushroomtrail.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mushroomtrail.backend.model.Spot;
import com.mushroomtrail.backend.model.User;
import com.mushroomtrail.backend.repository.SpotRepository;
import com.mushroomtrail.backend.repository.UserRepository;

@Service
public class SpotService {
  private final UserRepository userRepository;

  private final SpotRepository spotRepository;

  public SpotService(SpotRepository spotRepository, UserRepository userRepository) {
    this.spotRepository = spotRepository;
    this.userRepository = userRepository;
  }

  public Optional<List<Spot>> findByUserId(Long userId) {

    Optional<User> userOpt = userRepository.findById(userId);

    if (userOpt.isEmpty()) {
      return Optional.empty();
    }
    List<Spot> spotUserList = spotRepository.findByUser(userOpt.get());

    if (spotUserList.isEmpty()) {
      return Optional.empty();
    }
    return Optional.of(spotUserList);
  }

  public Spot saveSpot(Spot spot) {
    if (spot.getUser() == null || spot.getUser().getId() == null) {
      throw new IllegalArgumentException("Id utente mancante");
    }

    Spot spotSalvato = spotRepository.save(spot);
    return spotSalvato;
  }

  public void deleteSpot(Long id) {
    spotRepository.deleteById(id);

  }

}
