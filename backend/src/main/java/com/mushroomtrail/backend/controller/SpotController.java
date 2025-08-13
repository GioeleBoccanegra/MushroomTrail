package com.mushroomtrail.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mushroomtrail.backend.model.Spot;
import com.mushroomtrail.backend.service.SpotService;

@RestController
@RequestMapping("/api/spot")
public class SpotController {

  private final SpotService spotService;

  public SpotController(SpotService spotService) {
    this.spotService = spotService;
  }

  @PostMapping
  public ResponseEntity<?> creaSpot(@RequestBody Spot spot) {
    try {
      Spot spotCreato = spotService.saveSpot(spot);
      return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("Spot salvato : ", spotCreato));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Spot>> getSpotUser(@PathVariable("userId") Long userId) {
    return spotService.findByUserId(userId).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")

  public ResponseEntity<Void> deleteSpot(@PathVariable("id") Long id) {
    spotService.deleteSpot(id);
    return ResponseEntity.noContent().build();
  }
}
