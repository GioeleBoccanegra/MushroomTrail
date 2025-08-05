package com.mushroomtrail.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mushroomtrail.backend.dto.UserResponseDto;
import com.mushroomtrail.backend.model.User;
import com.mushroomtrail.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
    if (userService.emailExists(user.getEmail())) {
      return ResponseEntity.badRequest().body(Map.of("email", "email già esistente"));
    }

    if (userService.usernameExists(user.getUsername())) {
      return ResponseEntity.badRequest().body(Map.of("username", "username già esistente"));
    }

    String rawPassword = user.getPassword();
    String encodedPassword = userService.encodePassword(rawPassword);
    user.setPassword(encodedPassword);
    userService.saveUser(user);

    UserResponseDto userDto = new UserResponseDto(user.getId(), user.getUsername(), user.getEmail());

    return ResponseEntity.status(HttpStatus.CREATED).body(userDto);

  }

}
