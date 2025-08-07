package com.mushroomtrail.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

}
