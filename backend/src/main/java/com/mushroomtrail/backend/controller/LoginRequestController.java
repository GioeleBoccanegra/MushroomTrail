package com.mushroomtrail.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mushroomtrail.backend.config.JwtUtils;
import com.mushroomtrail.backend.dto.LoginRequest;
import com.mushroomtrail.backend.model.User;
import com.mushroomtrail.backend.service.UserService;

@RestController
public class LoginRequestController {
  private final UserService userService;
  private final JwtUtils jwtUtils;

  public LoginRequestController(UserService userService, JwtUtils jwtUtils) {
    this.userService = userService;
    this.jwtUtils = jwtUtils;
  }

  @PostMapping("/api/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

    Optional<User> userOpt = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

    if (userOpt.isPresent()) {
      User user = userOpt.get();
      String token = jwtUtils.generateToken(user.getId());

      Map<String, String> response = new HashMap<>();
      response.put("token", token);
      response.put("username", user.getUsername());
      response.put("userId", user.getId().toString());

      return ResponseEntity.ok(response);
    }

    return ResponseEntity.status(401).body("credenziali non valide");
  }

}
