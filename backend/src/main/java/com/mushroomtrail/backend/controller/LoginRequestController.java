package com.mushroomtrail.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mushroomtrail.backend.dto.LoginRequest;
import com.mushroomtrail.backend.model.User;
import com.mushroomtrail.backend.service.UserService;

@RestController
public class LoginRequestController {
  private final UserService userService;

  public LoginRequestController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/api/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

    Optional<User> userOpt = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

    if (userOpt.isPresent()) {
      User user = userOpt.get();

      Map<String, String> response = new HashMap<>();

      response.put("username", user.getUsername());
      response.put("userId", user.getId().toString());

      return ResponseEntity.ok(response);
    }

    return ResponseEntity.status(401).body("credenziali non valide");
  }

}
